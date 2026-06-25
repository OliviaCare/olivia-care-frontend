// Tipos globales para el widget de Calendly cargado vía script externo (index.html).
interface CalendlyWidget {
  initPopupWidget: (options: { url: string }) => void;
  initBadgeWidget: (options: {
    url: string;
    text: string;
    color?: string;
    textColor?: string;
    branding?: boolean;
  }) => void;
  closePopupWidget?: () => void;
}

interface Window {
  Calendly?: CalendlyWidget;
}
