import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { calculateCervantesResults } from '../utils/cervantesCalculator';
import { createOrUpdateUser } from '../services/userService';

const cervantesQuestions = [
  // Menopausia y Salud
  { id: 1, text: "Siento sofocos", domain: "menopausiaySalud", tooltip: "Sensación repentina de calor que sube por el pecho, cuello y cara" },
  { id: 2, text: "Siento molestias al corazón (noto latidos, taquicardia, opresión)", domain: "menopausiaySalud" },
  { id: 3, text: "Tengo dificultades para dormir", domain: "menopausiaySalud" },
  { id: 4, text: "Noto hormigueos en las manos y/o los pies", domain: "menopausiaySalud" },
  { id: 5, text: "Me noto inquieta o nerviosa", domain: "menopausiaySalud" },
  
  // Psíquico
  { id: 6, text: "Todo me aburre, incluso las actividades que antes me divertían", domain: "psiquico" },
  { id: 7, text: "Tengo sentimientos de tristeza", domain: "psiquico" },
  { id: 8, text: "Me noto más torpe, tengo menos habilidad manual", domain: "psiquico" },
  { id: 9, text: "Me noto más torpe de pensamiento, menos ágil mentalmente", domain: "psiquico" },
  { id: 10, text: "Tengo pérdidas de memoria, me olvido más de las cosas", domain: "psiquico" },

  // Sexualidad
  { id: 11, text: "He notado que tengo menos deseo sexual", domain: "sexualidad" },
  { id: 12, text: "Tengo menos relaciones sexuales", domain: "sexualidad" },
  { id: 13, text: "Cuando tengo relaciones sexuales son menos satisfactorias", domain: "sexualidad" },
  { id: 14, text: "Tengo sequedad vaginal", domain: "sexualidad" },

  // Relación de Pareja
  { id: 15, text: "Mi papel como esposa o pareja ha cambiado", domain: "relacionPareja" },
  { id: 16, text: "Mi relación de pareja se ha deteriorado", domain: "relacionPareja" },
  { id: 17, text: "Me cuesta expresar mis sentimientos", domain: "relacionPareja" }
];

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAnswer = async (value: number) => {
    if (loading) return;

    const newAnswers = { ...answers, [cervantesQuestions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < cervantesQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      try {
        const results = calculateCervantesResults(newAnswers);
        
        if (currentUser) {
          await createOrUpdateUser(currentUser.uid, {
            assessmentResults: {
              ...results,
              date: new Date(),
              answers: newAnswers
            }
          });
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/register', { 
            replace: true,
            state: { 
              assessmentCompleted: true,
              answers: newAnswers,
              results,
              paymentPending: true
            }
          });
        }
      } catch (err: any) {
        console.error('Error en el assessment:', err);
        setError(err.message || 'Error al procesar las respuestas. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0 && !loading) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Procesando tus respuestas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Escala Cervantes de Calidad de Vida</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pregunta {currentQuestion + 1} de {cervantesQuestions.length}</span>
            <span className="text-purple-600">
              {Math.round((currentQuestion / cervantesQuestions.length) * 100)}% completado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestion / cervantesQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <p className="text-lg font-medium">{cervantesQuestions[currentQuestion].text}</p>
            {cervantesQuestions[currentQuestion].tooltip && (
              <div className="relative ml-2">
                <HelpCircle
                  className="text-purple-600 cursor-pointer"
                  size={20}
                  onMouseEnter={() => setShowTooltip(currentQuestion)}
                  onMouseLeave={() => setShowTooltip(null)}
                />
                {showTooltip === currentQuestion && (
                  <div className="absolute z-10 w-64 p-2 bg-white border rounded-md shadow-lg -right-2 top-6">
                    {cervantesQuestions[currentQuestion].tooltip}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((value) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  answers[cervantesQuestions[currentQuestion].id] === value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-purple-100'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Nunca</span>
            <span>Siempre</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center ${
              currentQuestion === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-purple-600 hover:text-purple-800'
            }`}
          >
            <ArrowLeft size={20} className="mr-1" />
            Anterior
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2">¿Cómo interpretar las respuestas?</h3>
        <p className="text-sm text-gray-600">
          0 = Nunca<br />
          1 = Raramente<br />
          2 = A veces<br />
          3 = Con frecuencia<br />
          4 = Constantemente
        </p>
      </div>
    </div>
  );
};

export default Assessment;