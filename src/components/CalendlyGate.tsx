import React, { ReactNode } from 'react';

const CALENDLY_URL = 'https://calendly.com/d/cm3j-sqs-59n/consulta-online';

interface CalendlyGateProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * "Muro" de acceso: muestra el contenido difuminado y, encima, una tarjeta
 * que invita a reservar una consulta. Al pulsar abre el pop-up de Calendly.
 */
const CalendlyGate: React.FC<CalendlyGateProps> = ({
  children,
  title = 'Contenido exclusivo',
  description = 'Reserva una consulta gratuita con una de nuestras expertas para desbloquear esta sección.',
}) => {
  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
    } else {
      window.open(CALENDLY_URL, '_blank');
    }
  };

  return (
    <div className="relative">
      <div
        className="max-h-[78vh] overflow-hidden blur-[6px] select-none pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 max-w-md w-full text-center p-8">
          <h2 className="text-2xl font-bold text-olivia-primary mb-3">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <button
            onClick={openCalendly}
            className="bg-olivia-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Consulta una experta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendlyGate;
