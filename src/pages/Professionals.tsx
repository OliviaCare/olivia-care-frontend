import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Video, X, Clock, Calendar, MapPin } from 'lucide-react';
import { InlineWidget } from 'react-calendly';

interface Professional {
  id: number;
  name: string;
  specialty: string;
  image: string;
  calendlyUrl: string;
  consultationTime: string;
  languages: string[];
  location: string;
  price: number;
  availability: string;
  education: string[];
  experience: string;
  specializations: string[];
}

const professionals: Professional[] = [
  {
    id: 1,
    name: 'Dra. Inés Pérez Zabala',
    specialty: 'Ginecología y Medicina Menopáusica',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calendlyUrl: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online',
    consultationTime: '45 minutos',
    languages: ['Español', 'Inglés'],
    location: 'Consulta Virtual',
    price: 0,
    availability: 'Lun-Vie: 9:00-18:00',
    education: [
      'Doctorado en Medicina, Universidad de Barcelona',
      'Especialidad en Ginecología, Hospital Clínic',
      'Máster en Medicina Menopáusica, Universidad Autónoma de Madrid'
    ],
    experience: '15 años de experiencia',
    specializations: [
      'Terapia Hormonal Sustitutiva',
      'Salud Sexual en la Menopausia',
      'Osteoporosis'
    ]
  },
  {
    id: 2,
    name: 'Sonia Ruiz',
    specialty: 'Coach en Menopausia',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calendlyUrl: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online',
    consultationTime: '60 minutos',
    languages: ['Español'],
    location: 'Consulta Virtual',
    price: 0,
    availability: 'Lun-Vie: 10:00-19:00',
    education: [
      'Certificación en Coaching de Salud',
      'Especialista en Acompañamiento en la Menopausia',
      'Formación en Nutrición Holística'
    ],
    experience: '8 años de experiencia',
    specializations: [
      'Coaching de Bienestar en Menopausia',
      'Gestión del Estrés y Ansiedad',
      'Hábitos Saludables y Estilo de Vida'
    ]
  },
  {
    id: 3,
    name: 'Aoife McGale',
    specialty: 'Coach en Menopausia y Bienestar',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calendlyUrl: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online',
    consultationTime: '50 minutos',
    languages: ['Español', 'Inglés'],
    location: 'Consulta Virtual',
    price: 0,
    availability: 'Mar-Sáb: 9:00-18:00',
    education: [
      'Certificación Internacional en Coaching de Salud',
      'Especialización en Menopausia y Bienestar',
      'Formación en Mindfulness y Meditación'
    ],
    experience: '6 años de experiencia',
    specializations: [
      'Transición Natural en la Menopausia',
      'Mindfulness y Gestión Emocional',
      'Bienestar Integral y Balance Hormonal'
    ]
  },
  {
    id: 4,
    name: 'Dr. Carlos Pérez',
    specialty: 'Endocrinología y Nutrición',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calendlyUrl: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online',
    consultationTime: '60 minutos',
    languages: ['Español', 'Inglés', 'Francés'],
    location: 'Consulta Virtual',
    price: 0,
    availability: 'Mar-Sáb: 10:00-19:00',
    education: [
      'Doctor en Medicina, Universidad Complutense de Madrid',
      'Especialidad en Endocrinología, Hospital La Paz',
      'Postgrado en Nutrición Clínica'
    ],
    experience: '12 años de experiencia',
    specializations: [
      'Nutrición en la Menopausia',
      'Trastornos Hormonales',
      'Síndrome Metabólico'
    ]
  },
  {
    id: 5,
    name: 'Dra. Ana Gómez',
    specialty: 'Psicología y Terapia Cognitivo-Conductual',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    calendlyUrl: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online',
    consultationTime: '50 minutos',
    languages: ['Español', 'Portugués'],
    location: 'Consulta Virtual',
    price: 0,
    availability: 'Lun-Vie: 8:00-20:00',
    education: [
      'Doctorado en Psicología Clínica, UNED',
      'Máster en Terapia Cognitivo-Conductual',
      'Especialista en Psicología de la Mujer'
    ],
    experience: '10 años de experiencia',
    specializations: [
      'Ansiedad y Depresión',
      'Cambios Emocionales en la Menopausia',
      'Terapia de Pareja'
    ]
  }
];

const Professionals: React.FC = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const handleSchedule = (professional: Professional) => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cm3j-sqs-59n/consulta-online'
      });
    } else {
      setSelectedProfessional(professional);
      setShowCalendly(true);
    }
  };

  const handleMessage = (professional: Professional) => {
    setSelectedProfessional(professional);
    setShowMessage(true);
  };

  const handleClose = () => {
    setSelectedProfessional(null);
    setShowCalendly(false);
    setShowMessage(false);
  };

  const toggleDetails = (id: number) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Nuestros Profesionales</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((professional) => (
          <div key={professional.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={professional.image} alt={professional.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{professional.name}</h3>
              <p className="text-gray-600 mb-4">{professional.specialty}</p>

              <div className={`space-y-3 ${showDetails === professional.id ? 'block' : 'hidden'}`}>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span>{professional.consultationTime}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{professional.availability}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-2" />
                  <span>{professional.location}</span>
                </div>
                <div className="text-gray-600">
                  <strong>Idiomas:</strong> {professional.languages.join(', ')}
                </div>
                <div className="text-purple-600 font-semibold">
                  Primera consulta gratuita
                </div>
              </div>

              <button
                onClick={() => toggleDetails(professional.id)}
                className="text-purple-600 hover:text-purple-800 text-sm mb-4"
              >
                {showDetails === professional.id ? 'Ver menos' : 'Ver más'}
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleSchedule(professional)}
                  className="flex items-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
                >
                  <Video size={18} className="mr-2" />
                  Agendar
                </button>
                <button
                  onClick={() => handleMessage(professional)}
                  className="flex items-center border border-purple-600 text-purple-600 px-4 py-2 rounded hover:bg-purple-50 transition duration-300"
                >
                  <MessageCircle size={18} className="mr-2" />
                  Mensaje
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showCalendly && selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh] overflow-y-auto relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Agendar cita con {selectedProfessional.name}</h2>
              <p className="text-gray-600">
                Consulta virtual de {selectedProfessional.consultationTime} - Primera consulta gratuita
              </p>
            </div>
            <InlineWidget
              url="https://calendly.com/d/cm3j-sqs-59n/consulta-online"
              styles={{ height: 'calc(80vh - 140px)' }}
              prefill={{
                name: "Usuario de Maia",
                email: "usuario@ejemplo.com",
              }}
            />
          </div>
        </div>
      )}
      
      {showMessage && selectedProfessional && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Mensaje para {selectedProfessional.name}</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <textarea
              className="w-full p-2 border rounded mb-4 h-32 resize-none"
              placeholder="Escribe tu mensaje o pregunta aquí..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="mr-2 px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                Enviar Mensaje
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default Professionals;