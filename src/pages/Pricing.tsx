import React from 'react';
import { Check, CreditCard, Calendar, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    'Evaluación personalizada de síntomas',
    'Plan de bienestar adaptado',
    'Seguimiento diario de síntomas',
    'Acceso a contenido educativo premium',
    'Consultas con profesionales',
    'Comunidad de apoyo',
    'Retos y logros personalizados',
    'Recordatorios y notificaciones'
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          Planes y Precios
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen acceso a las funcionalidades básicas de Maia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Prueba */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-purple-800">Plan Prueba</h2>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                7 días gratis
              </span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-gray-600 ml-2">/ 7 días</span>
            </div>
            <p className="text-gray-600 mb-6">
              Prueba todas las funcionalidades premium de Maia sin compromiso.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="text-green-500 mr-2" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Calendar size={20} className="mr-2" />
              Comenzar período de prueba
            </button>
          </div>
        </div>

        {/* Plan Premium */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-lg overflow-hidden text-white">
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Plan Premium</h2>
              <span className="bg-white text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Más popular
              </span>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">€20</span>
              <span className="ml-2">/ mes</span>
            </div>
            <p className="mb-6 text-purple-100">
              Acceso completo a todas las funcionalidades y beneficios de Maia.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-purple-100">
                  <Star className="text-yellow-400 mr-2" size={20} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/register')}
              className="w-full bg-white text-purple-600 py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center"
            >
              <CreditCard size={20} className="mr-2" />
              Suscribirse ahora
            </button>
            <p className="text-sm text-center mt-4 text-purple-100">
              Cancela en cualquier momento
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-purple-50 p-8 rounded-2xl">
        <h3 className="text-xl font-semibold text-purple-800 mb-4">
          Preguntas Frecuentes
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-purple-700 mb-2">
              ¿Puedo cancelar mi suscripción en cualquier momento?
            </h4>
            <p className="text-gray-600">
              Sí, puedes cancelar tu suscripción cuando quieras. No hay compromisos a largo plazo.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 mb-2">
              ¿Qué incluye el período de prueba?
            </h4>
            <p className="text-gray-600">
              El período de prueba de 7 días incluye acceso completo a todas las funcionalidades premium de Maia.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 mb-2">
              ¿Necesito tarjeta de crédito para el período de prueba?
            </h4>
            <p className="text-gray-600">
              No, puedes comenzar tu período de prueba sin introducir información de pago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;