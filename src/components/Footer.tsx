import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, Activity, Users, MessagesSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Footer tipo app: barra de navegación a las funcionalidades principales.
 * En móvil va fija abajo (como una app nativa); en escritorio queda al final.
 */
const Footer: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const items = [
    { path: currentUser ? '/dashboard' : '/', text: 'Inicio', icon: Home },
    { path: '/education', text: 'Educación', icon: Book },
    { path: '/symptom-tracker', text: 'Síntomas', icon: Activity },
    { path: '/professionals', text: 'Profesionales', icon: Users },
    { path: '/community', text: 'Comunidad', icon: MessagesSquare },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path + '/'));

  return (
    <footer className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-purple-100 shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:static md:shadow-none">
      <nav className="flex justify-around items-stretch h-16 max-w-3xl mx-auto" aria-label="Navegación principal">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.text}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors ${
                active
                  ? 'text-olivia-primary'
                  : 'text-gray-500 hover:text-olivia-primary'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[11px] leading-tight ${active ? 'font-semibold' : 'font-medium'}`}>
                {item.text}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="hidden md:flex justify-center gap-6 pb-3 text-xs text-gray-400">
        <Link to="/terms" className="hover:text-olivia-primary">Términos de Uso</Link>
        <Link to="/privacy-policy" className="hover:text-olivia-primary">Política de Privacidad</Link>
        <a href="mailto:info@maiacare.es" className="hover:text-olivia-primary">Contacto</a>
      </div>
    </footer>
  );
};

export default Footer;
