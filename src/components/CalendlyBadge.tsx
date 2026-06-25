import React, { useEffect } from 'react';

const CALENDLY_URL = 'https://calendly.com/d/cm3j-sqs-59n/consulta-online';

/**
 * Botón flotante ("badge") de Calendly, solo en la página donde se monte (Inicio).
 *
 * Importante: NO eliminamos el nodo del badge al desmontar. Calendly guarda una
 * referencia interna y, al reinicializar, llama a su propio destroy() que hace
 * removeChild. Si ya lo hubiéramos quitado del DOM, ese removeChild fallaría
 * (Cannot read properties of null) y tumbaría la app. Por eso lo OCULTAMOS.
 */
const CalendlyBadge: React.FC = () => {
  useEffect(() => {
    let interval: number | undefined;

    const init = (): boolean => {
      if (!window.Calendly?.initBadgeWidget) return false;
      try {
        window.Calendly.initBadgeWidget({
          url: CALENDLY_URL,
          text: 'Consultar a una experta',
          color: '#5f5ff6',
          textColor: '#ffffff',
        });
      } catch (e) {
        // Calendly puede lanzar al reinicializar un badge previo; lo ignoramos.
        console.warn('Calendly badge init falló:', e);
      }
      return true;
    };

    if (!init()) {
      interval = window.setInterval(() => {
        if (init() && interval) window.clearInterval(interval);
      }, 300);
      window.setTimeout(() => interval && window.clearInterval(interval), 8000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
      // Ocultar (no eliminar) para no romper el destroy interno de Calendly.
      document.querySelectorAll('.calendly-badge-widget').forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    };
  }, []);

  return null;
};

export default CalendlyBadge;
