import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-olivia-primary text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-xl font-semibold">Olivia</p>
          <p className="text-sm text-white/90">Cuidando de ti en cada etapa</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/terms" className="hover:text-olivia-secondary transition-colors">
            Términos de Uso
          </Link>
          <Link to="/privacy-policy" className="hover:text-olivia-secondary transition-colors">
            Política de Privacidad
          </Link>
          <a 
            href="mailto:hola@oliviacare.es"
            className="hover:text-olivia-secondary transition-colors flex items-center"
          >
            <Mail size={18} className="mr-1" />
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;