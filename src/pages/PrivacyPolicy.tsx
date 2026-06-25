import React from 'react';
import { Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-8">Políticas de Privacidad</h1>

        <div className="prose prose-purple max-w-none">
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">1. Introducción</h3>
            <p className="text-gray-700 mb-4">
              En Maia, valoramos la privacidad de nuestras usuarias y nos comprometemos a proteger la información personal que comparten con nosotros. 
              Estas políticas de privacidad explican cómo recopilamos, utilizamos, almacenamos y protegemos los datos personales de nuestras usuarias. 
              Al utilizar nuestra plataforma, aceptas las prácticas descritas en este documento.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">2. Información Recopilada</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Datos Personales</strong>: Cuando te registras en Maia, recopilamos información como tu nombre, 
                dirección de correo electrónico, fecha de nacimiento, y detalles relacionados con los síntomas de la 
                menopausia para crear un perfil personalizado.
              </li>
              <li>
                <strong>Datos de Uso</strong>: Recopilamos información sobre cómo utilizas nuestra plataforma, incluyendo 
                las funcionalidades que utilizas, las páginas que visitas y las interacciones con los planes de bienestar.
              </li>
              <li>
                <strong>Datos de Salud</strong>: Como parte de nuestro servicio, también podemos recopilar información 
                relacionada con tu salud, como tus síntomas y evaluaciones, para ofrecerte planes personalizados.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">3. Uso de la Información</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Personalización de la Experiencia</strong>: Utilizamos la información recopilada para personalizar 
                los planes de bienestar y recomendaciones que ofrecemos a cada usuaria.
              </li>
              <li>
                <strong>Mejora del Servicio</strong>: Analizamos los datos de uso para mejorar la funcionalidad y la 
                calidad de nuestra plataforma.
              </li>
              <li>
                <strong>Comunicación</strong>: Podemos utilizar tu dirección de correo electrónico para enviarte 
                notificaciones sobre cambios en tu plan, recordatorios, y comunicados relevantes para tu bienestar.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">4. Base Legal para el Tratamiento de Datos</h3>
            <p className="text-gray-700 mb-4">
              Tratamos los datos personales de las usuarias bajo las siguientes bases legales:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Consentimiento</strong>: Al registrarte y utilizar Maia, das tu consentimiento explícito para 
                el tratamiento de tus datos personales y de salud.
              </li>
              <li>
                <strong>Cumplimiento de una Obligación Legal</strong>: Podemos tratar los datos personales cuando sea 
                necesario para cumplir con nuestras obligaciones legales.
              </li>
              <li>
                <strong>Intereses Legítimos</strong>: Utilizamos los datos para mejorar la plataforma y garantizar la 
                mejor experiencia posible para nuestras usuarias.
              </li>
            </ul>
          </section>

          {/* Continue with sections 5-13... */}
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">13. Contacto</h3>
            <p className="text-gray-700 flex items-center">
              Si tienes alguna pregunta o inquietud sobre nuestras políticas de privacidad o sobre cómo manejamos tu 
              información, puedes contactarnos en: 
              <a 
                href="mailto:info@maiacare.es" 
                className="flex items-center ml-2 text-purple-600 hover:text-purple-800"
              >
                <Mail size={18} className="mr-1" />
                info@maiacare.es
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;