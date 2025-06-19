import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Heart, Share2, Send, Filter, TrendingUp, Award, Tag, Search, AlertCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  createPost, 
  getPosts, 
  createComment, 
  getComments,
  likePost,
  likeComment,
  type CommunityPost,
  type PostComment
} from '../services/communityService';

const categories = [
  { id: 'all', name: 'Todo', icon: <MessageSquare size={18} /> },
  { id: 'symptoms', name: 'Síntomas', icon: <AlertCircle size={18} /> },
  { id: 'lifestyle', name: 'Estilo de Vida', icon: <TrendingUp size={18} /> },
  { id: 'success', name: 'Historias de Éxito', icon: <Award size={18} /> },
  { id: 'questions', name: 'Preguntas', icon: <Search size={18} /> }
];

const commonTags = [
  'Sofocos', 'Insomnio', 'Ansiedad', 'Nutrición', 'Ejercicio',
  'Relaciones', 'Bienestar', 'Consejos', 'Tratamientos', 'Experiencias'
];

const Community: React.FC = () => {
  const { currentUser, userData } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [postId: string]: PostComment[] }>({});
  const [newComments, setNewComments] = useState<{ [postId: string]: string }>({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      
      // Load comments for each post
      const commentsPromises = fetchedPosts.map(post => 
        getComments(post.id!).then(postComments => ({
          postId: post.id!,
          comments: postComments
        }))
      );
      
      const allComments = await Promise.all(commentsPromises);
      const commentsMap = allComments.reduce((acc, { postId, comments }) => {
        acc[postId] = comments;
        return acc;
      }, {} as { [postId: string]: PostComment[] });
      
      setComments(commentsMap);
    } catch (err) {
      setError('Error al cargar los posts. Por favor, intenta de nuevo.');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !currentUser || !userData) return;

    try {
      setLoading(true);
      const postData = {
        userId: currentUser.uid,
        author: userData.name,
        authorRole: "Miembro",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
        content: newPost,
        tags: selectedTags,
        isProfessional: userData.role === 'PROFESSIONAL',
        isVerified: userData.emailVerified
      };

      await createPost(postData);
      setNewPost("");
      setSelectedTags([]);
      setShowTagSelector(false);
      await loadPosts(); // Reload posts to show the new one
    } catch (err) {
      setError('Error al crear el post. Por favor, intenta de nuevo.');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (postId: string) => {
    if (!newComments[postId]?.trim() || !currentUser || !userData) return;

    try {
      const commentData = {
        postId,
        userId: currentUser.uid,
        author: userData.name,
        authorRole: "Miembro",
        content: newComments[postId],
        timestamp: new Date(),
        isProfessional: userData.role === 'PROFESSIONAL'
      };

      await createComment(commentData);
      setNewComments(prev => ({ ...prev, [postId]: '' }));
      
      // Reload comments for this post
      const updatedComments = await getComments(postId);
      setComments(prev => ({ ...prev, [postId]: updatedComments }));
    } catch (err) {
      setError('Error al crear el comentario. Por favor, intenta de nuevo.');
      console.error('Error creating comment:', err);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      await likePost(postId);
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, likes: post.likes + 1 }
            : post
        )
      );
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleLikeComment = async (postId: string, commentId: string) => {
    try {
      await likeComment(commentId);
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      }));
    } catch (err) {
      console.error('Error liking comment:', err);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.tags.some(tag => {
      switch (selectedCategory) {
        case 'symptoms': return ['Sofocos', 'Insomnio', 'Ansiedad'].includes(tag);
        case 'lifestyle': return ['Nutrición', 'Ejercicio', 'Bienestar'].includes(tag);
        case 'success': return ['Éxito', 'Experiencias'].includes(tag);
        case 'questions': return post.content.includes('?');
        default: return true;
      }
    });
  });

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Por favor, inicia sesión para acceder a la comunidad.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Comunidad Olivia</h1>
        <p className="text-gray-600 mb-6">
          Un espacio seguro para compartir experiencias, hacer preguntas y apoyarnos mutuamente.
        </p>
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Crear Post */}
        <form onSubmit={handlePostSubmit} className="mb-6">
          <textarea
            className="w-full p-4 border rounded-lg resize-none mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            placeholder="Comparte tu experiencia o pregunta..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          ></textarea>
          
          {/* Selector de Tags */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowTagSelector(!showTagSelector)}
              className="flex items-center text-purple-600 hover:text-purple-800"
            >
              <Tag size={18} className="mr-2" />
              Añadir etiquetas
            </button>
            
            {showTagSelector && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                Publicar
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}
      </div>

      {/* Lista de Posts */}
      <div className="space-y-6">
        {loading && !posts.length ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              {/* Cabecera del Post */}
              <div className="flex items-start space-x-3 mb-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-semibold">{post.author}</span>
                    {post.isProfessional && (
                      <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                        Profesional verificado
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 text-sm">{post.authorRole}</span>
                  <span className="text-gray-400 text-sm ml-2">• {new Date(post.timestamp).toLocaleString()}</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="mb-4">
                <p className="whitespace-pre-line">{post.content}</p>
                
                {/* Tags */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex items-center space-x-6 text-gray-500">
                <button 
                  className="flex items-center hover:text-purple-600 transition-colors"
                  onClick={() => post.id && handleLikePost(post.id)}
                >
                  <Heart size={18} className="mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center hover:text-purple-600 transition-colors">
                  <MessageSquare size={18} className="mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center hover:text-purple-600 transition-colors">
                  <Share2 size={18} className="mr-1" />
                  Compartir
                </button>
              </div>

              {/* Comentarios */}
              <div className="mt-4 pt-4 border-t">
                {comments[post.id!]?.map((comment) => (
                  <div key={comment.id} className="mb-4 pl-4 border-l-2 border-gray-100">
                    <div className="flex items-center mb-2">
                      <span className="font-semibold">{comment.author}</span>
                      {comment.isProfessional && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                          Profesional
                        </span>
                      )}
                      <span className="text-gray-500 text-sm ml-2">{comment.authorRole}</span>
                      <span className="text-gray-400 text-sm ml-2">• {new Date(comment.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <button 
                      className="text-gray-500 hover:text-purple-600 transition-colors"
                      onClick={() => comment.id && handleLikeComment(post.id!, comment.id)}
                    >
                      <Heart size={16} className="inline mr-1" />
                      {comment.likes}
                    </button>
                  </div>
                ))}

                {/* Formulario de comentario */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newComments[post.id!] || ''}
                    onChange={(e) => setNewComments(prev => ({ ...prev, [post.id!]: e.target.value }))}
                    placeholder="Escribe un comentario..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => post.id && handleCommentSubmit(post.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;