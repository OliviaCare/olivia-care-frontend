import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const STYLE_ID = 'hide-cookiebot-style';

/**
 * Oculta el banner de Cookiebot (inyectado por la agencia vía GTM) dentro del
 * área personal: con sesión iniciada no se muestra; para visitantes de las
 * páginas públicas sigue apareciendo con normalidad.
 */
const CookiebotSuppressor: React.FC = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const w = window as unknown as { Cookiebot?: { hide?: () => void } };

    if (currentUser) {
      if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
          #CybotCookiebotDialog,
          #CybotCookiebotDialogBodyUnderlay,
          #CookiebotWidget {
            display: none !important;
          }
        `;
        document.head.appendChild(style);
      }
      try {
        w.Cookiebot?.hide?.();
      } catch (e) {
        // Si la API de Cookiebot no está lista, el CSS ya lo oculta.
      }
    } else {
      document.getElementById(STYLE_ID)?.remove();
    }
  }, [currentUser]);

  return null;
};

export default CookiebotSuppressor;
