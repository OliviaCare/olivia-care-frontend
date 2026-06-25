import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Video, Award, FileText, Users, Lightbulb, PlayCircle, UserCheck, HelpCircle, Calendar, Clock, BookOpen, Brain, Heart, Leaf, Shield, Download, ExternalLink, ThermometerSun, Droplets, Pill, Apple } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Todos', icon: <Book size={20} /> },
  { id: 'basics', name: 'Fundamentos', icon: <Lightbulb size={20} /> },
  { id: 'symptoms', name: 'Síntomas', icon: <Heart size={20} /> },
  { id: 'treatments', name: 'Tratamientos', icon: <Shield size={20} /> },
  { id: 'lifestyle', name: 'Estilo de Vida', icon: <Leaf size={20} /> },
  { id: 'mental', name: 'Bienestar Mental', icon: <Brain size={20} /> },
  { id: 'exercise', name: 'Ejercicios', icon: <Award size={20} /> }
];

const educationalContent = [
  {
    id: 9,
    type: 'article',
    link: '/education/alimentos-menopausia',
    category: 'lifestyle',
    title: '10 Alimentos para Reducir los Síntomas de la Menopausia',
    author: 'Equipo Nutricional Maia',
    readTime: '8 minutos',
    description: 'Descubre los 10 alimentos que pueden ayudarte a reducir los síntomas de la menopausia de forma natural y mejorar tu bienestar general durante esta etapa.',
    sections: [
      'Alimentos ricos en fitoestrógenos',
      'Fuentes de calcio y vitamina D',
      'Alimentos para controlar los sofocos',
      'Opciones para mejorar el sueño',
      'Superalimentos para la energía'
    ],
    hasInfographics: true,
    icon: <Apple className="text-green-600" />
  },
  
  {
    id: 8,
    type: 'article',
    link: '/education/terapia-hormonal-sustitutiva',
    category: 'treatments',
    title: 'Terapia Hormonal Sustitutiva (THS): Guía Básica',
    author: 'Equipo Médico Maia',
    readTime: '10 minutos',
    description: 'Información esencial sobre la Terapia Hormonal Sustitutiva, sus beneficios, riesgos y consideraciones importantes para tomar decisiones informadas.',
    sections: [
      '¿Qué es la THS y cómo funciona?',
      'Tipos de hormonas y formas de administración',
      'Beneficios para la salud a corto y largo plazo',
      'Posibles riesgos y efectos secundarios',
      'Cuándo iniciar el tratamiento'
    ],
    hasInfographics: true,
    icon: <Pill className="text-blue-600" />
  },
  
  {
    id: 0,
    type: 'article',
    link: '/education/sintomas-menopausia',
    category: 'symptoms',
    title: 'Síntomas de la Menopausia: Guía Completa',
    author: 'Equipo Maia',
    readTime: '12 minutos',
    description: 'Información detallada sobre los síntomas más comunes de la menopausia, cómo identificarlos y estrategias para manejarlos.',
    sections: [
      'Sofocos y sudores nocturnos',
      'Cambios de humor y ansiedad',
      'Problemas de sueño',
      'Sequedad vaginal y cambios en la libido',
      'Fatiga y pérdida de energía'
    ],
    hasInfographics: true,
    icon: <ThermometerSun className="text-red-600" />
  },
  
  {
    id: 1,
    type: 'article',
    link: '/education/guia-sobre-la-menopausia',
    category: 'basics',
    title: 'Guía Completa sobre la Menopausia',
    author: 'Dra. María Rodríguez',
    readTime: '15 minutos',
    description: 'Todo lo que necesitas saber sobre la menopausia, sus etapas y cambios hormonales.',
    sections: [
      'Definición y etapas de la menopausia',
      'Cambios hormonales principales',
      'Signos y síntomas comunes',
      'Cuándo buscar ayuda médica'
    ],
    sources: [
      'North American Menopause Society (NAMS)',
      'International Menopause Society (IMS)'
    ],
    hasInfographics: true,
    icon: <BookOpen className="text-purple-600" />
  },
  
  {
    id: 2,
    type: 'video',
    link: '/education/menopausia-y-nutricion-video',
    category: 'lifestyle',
    title: 'Menopausia y Nutrición: Consejos Prácticos',
    duration: '10 minutos',
    instructor: 'Dra. Ana Gómez',
    description: 'Video informativo sobre la relación entre la menopausia y la nutrición, con consejos prácticos para mejorar tu alimentación durante esta etapa.',
    topics: [
      'Alimentos recomendados durante la menopausia',
      'Nutrientes esenciales para esta etapa',
      'Consejos para mantener un peso saludable'
    ],
    icon: <Video className="text-blue-600" />
  },

  {
    id: 3,
    type: 'exercise',
    link: '#',
    category: 'exercise',
    title: 'Programa de Ejercicios Adaptados',
    instructor: 'Sonia Ruiz',
    duration: 'Programa de 8 semanas',
    description: 'Rutinas de ejercicio diseñadas específicamente para mujeres en la menopausia.',
    levels: ['Principiante', 'Intermedio', 'Avanzado'],
    routines: [
      {
        name: 'Fortalecimiento del Suelo Pélvico',
        duration: '15 minutos',
        frequency: 'Diaria',
        precautions: ['Consultar si hay prolapso', 'Evitar si hay infección']
      },
      {
        name: 'Ejercicios de Fuerza con Peso Corporal',
        duration: '20 minutos',
        frequency: '3 veces por semana',
        precautions: ['Adaptar según condición física', 'Evitar si hay dolor articular agudo']
      },
      {
        name: 'Yoga Suave para Menopausia',
        duration: '30 minutos',
        frequency: '2-3 veces por semana',
        precautions: ['Modificar posturas según necesidad', 'Respetar límites personales']
      }
    ],
    progressTracking: true,
    icon: <Award className="text-green-600" />
  },

  {
    id: 4,
    type: 'guide',
    link: '/education/consejos-generales',
    category: 'lifestyle',
    title: 'Consejos Generales para la Menopausia',
    author: 'Ministerio de Sanidad',
    readTime: '10 minutos',
    description: 'Guía oficial del Ministerio de Sanidad con consejos prácticos para manejar la menopausia.',
    sections: [
      'Alimentación saludable y nutrición',
      'Ejercicio físico recomendado',
      'Manejo de síntomas comunes',
      'Cuidado de la salud ósea'
    ],
    downloadable: true,
    includes: [
      'Recomendaciones oficiales',
      'Consejos prácticos',
      'Información sobre tratamientos'
    ],
    icon: <FileText className="text-orange-600" />
  },

  {
    id: 5,
    type: 'workshop',
    link: 'https://maiacare.es/contacts/',
    category: 'mental',
    title: 'Taller: Mindfulness y Gestión Emocional',
    instructor: 'Aoife McGale',
    duration: '4 sesiones de 90 minutos',
    description: 'Aprende técnicas de mindfulness y gestión emocional específicas para la menopausia.',
    sessions: [
      {
        title: 'Fundamentos de Mindfulness',
        content: ['Respiración consciente', 'Escaneo corporal', 'Meditación básica']
      },
      {
        title: 'Gestión de la Ansiedad',
        content: ['Técnicas de grounding', 'Respuesta al estrés', 'Prácticas diarias']
      },
      {
        title: 'Regulación Emocional',
        content: ['Identificación de emociones', 'Estrategias de afrontamiento', 'Diario emocional']
      },
      {
        title: 'Integración y Práctica',
        content: ['Plan personal', 'Recursos continuos', 'Grupo de apoyo']
      }
    ],
    icon: <Brain className="text-purple-600" />
  },

  {
    id: 7,
    type: 'article',
    link: 'https://aeem.es/wp-content/uploads/2023/03/Informacion-Sindrome-genitourinario-de-la-Menopausia_GESS_V2-1.pdf',
    category: 'symptoms',
    title: 'Salud Íntima durante la Menopausia',
    author: 'Dra. Laura Sánchez',
    readTime: '8 minutos',
    description: 'Guía sobre los cambios en la salud íntima durante la menopausia y cómo manejarlos para mantener una vida sexual plena.',
    sections: [
      'Cambios fisiológicos en la vagina',
      'Sequedad vaginal y opciones de tratamiento',
      'Mantenimiento de la salud íntima',
      'Comunicación con la pareja'
    ],
    hasInfographics: true,
    icon: <Droplets className="text-pink-600" />
  }
];

const Search = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Education: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = educationalContent
    .filter(content => 
      selectedCategory === 'all' || content.category === selectedCategory
    )
    .filter(content =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const renderContentCard = (content: any) => {
    const baseCardClasses = "bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col";
    
    switch (content.type) {
      case 'article':
        return (
          <a href={content.link} target={content.link.startsWith('http') ? "_blank" : "_self"} rel={content.link.startsWith('http') ? "noopener noreferrer" : ""} className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
                <Clock size={14} className="mr-1.5" />
                {content.readTime}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-800">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-3 mb-4">
              {content.sections && content.sections.map((section: string, index: number) => (
                <div key={index} className="flex items-start text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{section}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center mt-auto">
              <ExternalLink size={18} className="mr-2" />
              {content.link.startsWith('http') ? 'Visitar Página' : 'Leer Artículo'}
            </button>
          </a>
        );

      case 'video':
        return (
          <Link to={content.link} className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.duration || "Serie de Videos"}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-3 mb-4">
              {content.episodes && content.episodes.map((episode: any, index: number) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800 mb-1">{episode.title}</div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    {episode.duration}
                  </div>
                </div>
              ))}
              {content.topics && content.topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-start text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mt-auto">
              <PlayCircle size={18} className="mr-2" />
              Ver Video
            </button>
          </Link>
        );

      case 'exercise':
        return (
          <div className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.duration}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-3 mb-4">
              {content.routines.map((routine: any, index: number) => (
                <div key={index} className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800 mb-1">{routine.name}</div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {routine.duration} • {routine.frequency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.open('https://www.youtube.com/watch?v=DmpZ5sPS86I&list=PLvMfTblQXhEYJaanu6jYWX-E1oel-En7N', '_blank')}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mt-auto"
            >
              <Award size={18} className="mr-2" />
              Comenzar Programa
            </button>
          </div>
        );

      case 'guide':
        return (
          <Link to={content.link} className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.readTime}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-orange-700">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-2 mb-4">
              {content.sections.map((section: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-500">
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2 flex-shrink-0">
                    {index + 1}
                  </div>
                  {section}
                </div>
              ))}
            </div>
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center mt-auto">
              <Download size={18} className="mr-2" />
              Descargar Guía
            </button>
          </Link>
        );

      case 'workshop':
        return (
          <div className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.duration}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-purple-700">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-3 mb-4">
              {content.sessions.map((session: any, index: number) => (
                <div key={index} className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800 mb-1">
                    Sesión {index + 1}: {session.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {session.content.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
            <a 
              href={content.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center mt-auto"
            >
              <UserCheck size={18} className="mr-2" />
              Inscribirse al Taller
            </a>
          </div>
        );

      case 'course':
        return (
          <div className={baseCardClasses}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                {content.icon}
              </div>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                {content.duration}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-700">{content.title}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{content.description}</p>
            <div className="space-y-3 mb-4">
              {content.modules.map((module: any, index: number) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-800 mb-1">{module.title}</div>
                  <div className="text-sm text-gray-500">
                    {module.content.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mt-auto">
              <BookOpen size={18} className="mr-2" />
              Comenzar Curso
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Contenido Educativo</h1>
        <p className="text-gray-600">
          Explora nuestro contenido educativo diseñado específicamente para acompañarte en tu viaje por la menopausia.
          Todo el contenido está respaldado por evidencia científica y expertos en el campo.
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar contenido..."
            className="w-full p-4 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Search size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-3 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {filteredContent.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <HelpCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron resultados</h3>
          <p className="text-gray-500">
            No hemos encontrado contenido que coincida con tu búsqueda. Intenta con otros términos o categorías.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map(content => (
            <div key={content.id} className="h-full">
              {renderContentCard(content)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;