import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CALENDLY_URL = 'https://calendly.com/d/cm3j-sqs-59n/consulta-online';

// Rutas donde se muestra el botón flotante de Calendly.
const showBadgeOn = (path: string): boolean =>
  path === '/' ||
  path === '/dashboard' ||
  path === '/education' ||
  path.startsWith('/education/');

/**
 * Botón flotante ("badge") de Calendly, montado una sola vez a nivel de App.
 *
 * Se inicializa UNA vez (cuando Calendly está listo y estamos en una ruta
 * permitida) y luego solo se muestra/oculta según la ruta. No se elimina ni se
 * reinicializa en cada navegación: eso evita el crash de removeChild que tumbaba
 * la app, y de paso es más eficiente.
 */
const CalendlyBadge: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const show = showBadgeOn(location.pathname);
    let interval: number | undefined;

    const apply = (): boolean => {
      const existing = document.querySelector(
        '.calendly-badge-widget'
      ) as HTMLElement | null;

      if (!show) {
        if (existing) existing.style.display = 'none';
        return true;
      }

      // Ruta permitida: mostrar el badge (crearlo si aún no existe).
      if (existing) {
        existing.style.display = '';
        return true;
      }
      if (!window.Calendly?.initBadgeWidget) return false;
      try {
        window.Calendly.initBadgeWidget({
          url: CALENDLY_URL,
          text: 'Consultar a una experta',
          color: '#5f5ff6',
          textColor: '#ffffff',
        });
      } catch (e) {
        console.warn('Calendly badge init falló:', e);
      }
      return true;
    };

    if (!apply()) {
      interval = window.setInterval(() => {
        if (apply() && interval) window.clearInterval(interval);
      }, 300);
      window.setTimeout(() => interval && window.clearInterval(interval), 8000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [location.pathname]);

  return null;
};

export default CalendlyBadge;
