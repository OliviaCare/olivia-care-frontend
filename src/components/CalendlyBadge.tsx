import React, { useEffect } from 'react';

const CALENDLY_URL = 'https://calendly.com/d/cm3j-sqs-59n/consulta-online';

/**
 * Botón flotante ("badge") de Calendly. Se monta solo en la página donde se use
 * (Inicio) y se retira al salir de ella.
 */
const CalendlyBadge: React.FC = () => {
  useEffect(() => {
    let interval: number | undefined;

    const init = (): boolean => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: CALENDLY_URL,
          text: 'Consultar a una experta',
          color: '#5f5ff6',
          textColor: '#ffffff',
        });
        return true;
      }
      return false;
    };

    // El script de Calendly puede no estar listo en el primer render.
    if (!init()) {
      interval = window.setInterval(() => {
        if (init() && interval) window.clearInterval(interval);
      }, 300);
      window.setTimeout(() => interval && window.clearInterval(interval), 8000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      document
        .querySelectorAll('.calendly-badge-widget')
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
};

export default CalendlyBadge;
