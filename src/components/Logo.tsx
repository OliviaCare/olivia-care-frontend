import React from 'react';

interface LogoProps {
  /** 'color' = logo morado (sobre fondo claro), 'white' = logo blanco (sobre fondo morado). */
  variant?: 'color' | 'white';
  /** Clases Tailwind, normalmente la altura, p. ej. "h-8". El ancho se ajusta solo. */
  className?: string;
}

/**
 * Logo oficial de Maia (SVG vectorial). Usa el archivo morado o blanco según el fondo.
 * Responsive: escala con la altura manteniendo proporción.
 */
const Logo: React.FC<LogoProps> = ({ variant = 'color', className = 'h-8' }) => {
  const src = variant === 'white' ? '/maia-logo-white.svg' : '/maia-logo.svg';
  return <img src={src} alt="Maia" className={`${className} w-auto`} />;
};

export default Logo;
