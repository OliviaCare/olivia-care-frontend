import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

interface ChallengeProps {
  title: string;
  description: string;
  progress: number;
  total: number;
  points: number;
  completed: boolean;
  daysLeft: number;
}

const ChallengeCard: React.FC<ChallengeProps> = ({
  title,
  description,
  progress,
  total,
  points,
  completed,
  daysLeft,
}) => {
  const progressPercentage = (progress / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        {completed ? (
          <CheckCircle className="text-green-500" size={24} />
        ) : (
          <Award className="text-purple-500" size={24} />
        )}
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>{progress} de {total}</span>
          <span>{points} puntos</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {!completed && (
        <p className="text-sm text-gray-500">
          {daysLeft} días restantes
        </p>
      )}
    </div>
  );
};

export default ChallengeCard;