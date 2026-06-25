import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Award, Home, Book, Activity, Users, Trophy, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const authMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAuthMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target as Node)) {
        setIsAuthMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hideNav = ['/login', '/signup'].includes(location.pathname);

  if (hideNav) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center">
            <Logo className="h-8" />
          </Link>
        </div>
      </header>
    );
  }

  const menuItems = [
    { path: '/dashboard', text: 'Inicio', icon: <Home size={24} /> },
    { path: '/education', text: 'Educación', icon: <Book size={24} /> },
    { path: '/symptom-tracker', text: 'Síntomas', icon: <Activity size={24} /> },
    { path: '/professionals', text: 'Profesionales', icon: <Users size={24} /> },
    { path: '/community', text: 'Comunidad', icon: <Users size={24} /> },
    // { path: '/challenges', text: 'Retos', icon: <Trophy size={24} /> },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}>
        <div className="container mx-auto h-16">
          <div className="flex items-center justify-between h-full px-4">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => {
                setIsMenuOpen(false);
                setIsAuthMenuOpen(false);
              }}
            >
              <Logo className="h-8" />
            </Link>

            {/* Menú de escritorio */}
            {currentUser && (
              <nav className="hidden md:flex items-center space-x-6">
                {menuItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'text-olivia-primary bg-purple-50'
                        : 'text-gray-600 hover:text-olivia-primary hover:bg-purple-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </Link>
                ))}
              </nav>
            )}

            {/* Botón de menú móvil o perfil */}
            <div className="flex items-center">
              {currentUser ? (
                <>
                  {/* Profile link for desktop - icon only */}
                  <Link
                    to="/profile"
                    className="hidden md:flex items-center justify-center p-2 rounded-lg transition-colors text-gray-600 hover:text-olivia-primary hover:bg-purple-50 mr-2"
                    aria-label="Perfil de usuario"
                  >
                    <User size={24} />
                  </Link>
                  
                  {/* Mobile menu button */}
                  <button
                    className="p-2 touch-feedback md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menú principal"
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </>
              ) : (
                <div className="relative" ref={authMenuRef}>
                  <button
                    onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    className="p-2 touch-feedback"
                    aria-label="Menú de autenticación"
                    aria-expanded={isAuthMenuOpen}
                  >
                    <User size={24} className="text-gray-600" />
                  </button>

                  {/* Menú desplegable de autenticación */}
                  <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg transform origin-top-right transition-all duration-200 ease-in-out ${
                    isAuthMenuOpen 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}>
                    <div className="py-2">
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-olivia-primary"
                        onClick={() => setIsAuthMenuOpen(false)}
                      >
                        <LogIn size={24} className="mr-3" />
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-olivia-primary"
                        onClick={() => setIsAuthMenuOpen(false)}
                      >
                        <UserPlus size={24} className="mr-3" />
                        Registrarse
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {currentUser && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Menú</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-purple-50 transition-colors touch-feedback"
                    aria-label="Cerrar menú"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {menuItems.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-purple-50 text-olivia-primary'
                          : 'text-gray-600 hover:bg-purple-50 hover:text-olivia-primary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              <div className="p-4 border-t">
                <Link
                  to="/profile"
                  className="flex items-center space-x-4 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-olivia-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={24} />
                  <span className="font-medium">Perfil</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Espaciador para compensar el header fijo */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;