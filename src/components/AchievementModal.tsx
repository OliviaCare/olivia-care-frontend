import React from 'react';
import Confetti from 'react-confetti';
import { Trophy, X } from 'lucide-react';

interface AchievementModalProps {
  title: string;
  description: string;
  points: number;
  onClose: () => void;
}

const AchievementModal: React.FC<AchievementModalProps> = ({ title, description, points, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
      />
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-4">
            <Trophy className="mx-auto text-yellow-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Logro Desbloqueado!</h2>
          <h3 className="text-xl text-purple-600 mb-4">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="bg-purple-100 text-purple-800 py-2 px-4 rounded-full inline-block">
            +{points} puntos
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;