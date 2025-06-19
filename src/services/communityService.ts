import { 
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  where,
  doc,
  updateDoc,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface CommunityPost {
  id?: string;
  author: string;
  authorRole: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
  userId: string;
  isProfessional?: boolean;
  isVerified?: boolean;
}

export interface PostComment {
  id?: string;
  postId: string;
  userId: string;
  author: string;
  authorRole: string;
  content: string;
  likes: number;
  timestamp: Date;
  isProfessional?: boolean;
}

export const createPost = async (postData: Omit<CommunityPost, 'id' | 'likes' | 'comments'>) => {
  try {
    const postsRef = collection(db, 'communityPosts');
    const docRef = await addDoc(postsRef, {
      ...postData,
      likes: 0,
      comments: 0,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const postsRef = collection(db, 'communityPosts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as CommunityPost[];
  } catch (error) {
    console.error('Error getting posts:', error);
    throw error;
  }
};

export const createComment = async (commentData: Omit<PostComment, 'id' | 'likes'>) => {
  try {
    const commentsRef = collection(db, 'comments');
    const docRef = await addDoc(commentsRef, {
      ...commentData,
      likes: 0,
      timestamp: Timestamp.now()
    });

    // Increment comment count on the post
    const postRef = doc(db, 'communityPosts', commentData.postId);
    await updateDoc(postRef, {
      comments: increment(1)
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getComments = async (postId: string) => {
  try {
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('timestamp', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as PostComment[];
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

export const likePost = async (postId: string) => {
  try {
    const postRef = doc(db, 'communityPosts', postId);
    await updateDoc(postRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const likeComment = async (commentId: string) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error('Error liking comment:', error);
    throw error;
  }
};