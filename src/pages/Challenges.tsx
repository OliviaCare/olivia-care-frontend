import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import AchievementModal from '../components/AchievementModal';
import { Trophy, Target, Zap, Calendar, Star, TrendingUp, Users, Award, Crown } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly';
  progress: number;
  total: number;
  points: number;
  completed: boolean;
  daysLeft: number;
  difficulty: 'easy' | 'medium' | 'hard';
  participants: number;
  rewards?: {
    type: 'points' | 'badge' | 'unlock';
    value: number | string;
    icon?: React.ReactNode;
  }[];
}

const Challenges: React.FC = () => {
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState({
    title: '',
    description: '',
    points: 0
  });
  const [selectedCategory, setSelectedCategory] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const challenges: Challenge[] = [
    // Retos Diarios
    {
      id: 'd1',
      title: "Registro Completo",
      description: "Registra todos tus síntomas y actividades del día",
      category: 'daily',
      progress: 1,
      total: 1,
      points: 50,
      completed: false,
      daysLeft: 1,
      difficulty: 'easy',
      participants: 1250,
      rewards: [
        { type: 'points', value: 50, icon: <Star className="text-yellow-400" /> },
        { type: 'badge', value: 'Comprometida', icon: <Award className="text-purple-400" /> }
      ]
    },
    {
      id: 'd2',
      title: "Mindfulness",
      description: "Realiza una sesión de mindfulness de 10 minutos",
      category: 'daily',
      progress: 0,
      total: 1,
      points: 30,
      completed: false,
      daysLeft: 1,
      difficulty: 'easy',
      participants: 856,
      rewards: [
        { type: 'points', value: 30 }
      ]
    },

    // Retos Semanales
    {
      id: 'w1',
      title: "Semana Activa",
      description: "Realiza ejercicio moderado 3 días esta semana",
      category: 'weekly',
      progress: 2,
      total: 3,
      points: 150,
      completed: false,
      daysLeft: 4,
      difficulty: 'medium',
      participants: 723,
      rewards: [
        { type: 'points', value: 150 },
        { type: 'badge', value: 'Deportista', icon: <Crown className="text-yellow-500" /> }
      ]
    },
    {
      id: 'w2',
      title: "Conexión Social",
      description: "Participa en 3 discusiones de la comunidad",
      category: 'weekly',
      progress: 1,
      total: 3,
      points: 100,
      completed: false,
      daysLeft: 5,
      difficulty: 'easy',
      participants: 542,
      rewards: [
        { type: 'points', value: 100 },
        { type: 'unlock', value: 'Chat grupal', icon: <Users className="text-blue-500" /> }
      ]
    },

    // Retos Mensuales
    {
      id: 'm1',
      title: "Maestra del Bienestar",
      description: "Completa 20 días de registro de síntomas",
      category: 'monthly',
      progress: 15,
      total: 20,
      points: 500,
      completed: false,
      daysLeft: 12,
      difficulty: 'hard',
      participants: 324,
      rewards: [
        { type: 'points', value: 500 },
        { type: 'badge', value: 'Experta en Bienestar', icon: <Trophy className="text-yellow-600" /> },
        { type: 'unlock', value: 'Consulta gratuita', icon: <Star className="text-purple-500" /> }
      ]
    }
  ];

  const filteredChallenges = challenges.filter(challenge => challenge.category === selectedCategory);

  const stats = {
    level: 5,
    currentPoints: 1250,
    nextLevelPoints: 1500,
    totalAchievements: 8,
    maxAchievements: 20,
    currentStreak: 7,
    bestStreak: 14
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Retos y Logros</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Nivel y Progreso */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Nivel {stats.level}</h2>
              <Crown className="text-yellow-300" size={24} />
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(stats.currentPoints / stats.nextLevelPoints) * 100}%` }} 
              />
            </div>
            <p>{stats.currentPoints}/{stats.nextLevelPoints} puntos para el siguiente nivel</p>
          </div>
          
          {/* Racha */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Racha Actual</h2>
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <p className="text-3xl text-purple-600 mb-1">{stats.currentStreak} días</p>
            <p className="text-sm text-gray-500">Mejor racha: {stats.bestStreak} días</p>
          </div>
          
          {/* Logros */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Logros</h2>
              <Trophy className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl text-purple-600 mb-1">
              {stats.totalAchievements}/{stats.maxAchievements}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(stats.totalAchievements / stats.maxAchievements) * 100}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Categorías de Retos */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedCategory('daily')}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'daily'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar size={18} className="mr-2" />
            Diarios
          </button>
          <button
            onClick={() => setSelectedCategory('weekly')}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'weekly'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target size={18} className="mr-2" />
            Semanales
          </button>
          <button
            onClick={() => setSelectedCategory('monthly')}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              selectedCategory === 'monthly'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Trophy size={18} className="mr-2" />
            Mensuales
          </button>
        </div>

        {/* Lista de Retos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    challenge.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {challenge.difficulty === 'easy' ? 'Fácil' :
                     challenge.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 flex items-center">
                    <Users size={14} className="mr-1" />
                    {challenge.participants}
                  </span>
                </div>
                {challenge.daysLeft > 0 && (
                  <span className="text-sm text-gray-500">
                    {challenge.daysLeft}d
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{challenge.progress} de {challenge.total}</span>
                  <span>{challenge.points} puntos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
              </div>

              {challenge.rewards && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Recompensas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {challenge.rewards.map((reward, index) => (
                      <div key={index} className="flex items-center bg-gray-50 px-2 py-1 rounded">
                        {reward.icon}
                        <span className="text-sm ml-1">
                          {reward.type === 'points' ? `${reward.value} pts` : reward.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showAchievement && (
        <AchievementModal
          {...currentAchievement}
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  );
};

export default Challenges;