import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Cierra cualquier pop-up de Calendly que haya quedado abierto al cambiar de ruta.
 * Calendly añade su overlay a <body> (fuera de React), así que si el usuario
 * navega sin cerrarlo, la capa se queda encima tapando la página.
 */
const CalendlyCleanup: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.Calendly?.closePopupWidget) {
      window.Calendly.closePopupWidget();
    }
    document
      .querySelectorAll('.calendly-overlay, .calendly-popup')
      .forEach((el) => el.remove());
  }, [location.pathname]);

  return null;
};

export default CalendlyCleanup;
