import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Brain, Zap } from 'lucide-react';
import CalendlyBadge from '../components/CalendlyBadge';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    console.log('Iniciando navegación al assessment...');
    navigate('/assessment', { replace: true });
  };

  const CALENDLY_URL = 'https://calendly.com/d/cm3j-sqs-59n/consulta-online';
  const openCalendly = () => {
    try {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        return;
      }
    } catch (e) {
      // Si Calendly falla, abrimos en una pestaña como respaldo.
    }
    window.open(CALENDLY_URL, '_blank');
  };

  return (
    <div className="text-center max-w-6xl mx-auto px-4">
      <CalendlyBadge />
      <h1 className="text-4xl font-bold text-olivia-primary mb-6">Bienvenida a Maia</h1>
      <p className="text-xl text-gray-600 mb-12">Tu compañera para una menopausia plena y saludable</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Sun size={32} />}
          title="Planes Personalizados"
          description="Recibe un plan diario adaptado a tus necesidades únicas"
        />
        <FeatureCard
          icon={<Brain size={32} />}
          title="Contenido Educativo"
          description="Aprende de expertos sobre la menopausia y el bienestar femenino"
        />
        <FeatureCard
          icon={<Zap size={32} />}
          title="Soporte Profesional"
          description="Conecta con especialistas para un cuidado personalizado"
        />
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleStartAssessment}
          className="bg-olivia-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Comienza tu evaluación
        </button>
        <button
          onClick={openCalendly}
          className="border-2 border-olivia-primary text-olivia-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-olivia-primary hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Consulta online
        </button>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ 
  icon, 
  title, 
  description 
}) => (
  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4 text-olivia-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  </div>
);

export default Home;