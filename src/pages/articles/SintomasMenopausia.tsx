import React from 'react';
import { ThermometerSun, Moon, Brain, Heart, Droplets, Activity } from 'lucide-react';

const SintomasMenopausia = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        Síntomas de la Menopausia: Guía Completa
      </h1>
      <p className="text-gray-600 mb-6">
        Información detallada sobre los síntomas más comunes de la menopausia, cómo identificarlos y estrategias para manejarlos.
      </p>

      <section className="mb-8">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg mb-8">
          <p className="text-gray-700 italic">
            "La menopausia es una etapa natural en la vida de toda mujer. Conocer sus síntomas te ayudará a entender los cambios que experimenta tu cuerpo y a buscar las soluciones más adecuadas para ti."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-purple-700 mb-6">
          Síntomas Comunes de la Menopausia
        </h2>

        <div className="space-y-8">
          {/* Sofocos */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                <ThermometerSun className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">Sofocos y Sudores Nocturnos</h3>
                <p className="text-gray-700 mb-4">
                  Los sofocos son sensaciones repentinas de calor intenso que se extienden por el pecho, cuello y rostro, a menudo acompañadas de sudoración y enrojecimiento de la piel. Cuando ocurren durante la noche, pueden interrumpir el sueño.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Mantener un ambiente fresco y bien ventilado</li>
                    <li>Vestir en capas que puedan quitarse fácilmente</li>
                    <li>Evitar desencadenantes como alcohol, cafeína y comidas picantes</li>
                    <li>Técnicas de respiración profunda y relajación</li>
                    <li>Consultar con un médico sobre opciones de tratamiento</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Problemas de sueño */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Moon className="text-indigo-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-2">Problemas de Sueño</h3>
                <p className="text-gray-700 mb-4">
                  Muchas mujeres experimentan dificultades para conciliar el sueño o mantenerlo durante la menopausia. Esto puede deberse a los sudores nocturnos, pero también a cambios hormonales que afectan directamente los patrones de sueño.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-medium text-indigo-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Mantener un horario regular de sueño</li>
                    <li>Crear un ambiente propicio para dormir: oscuro, fresco y silencioso</li>
                    <li>Evitar pantallas antes de acostarse</li>
                    <li>Limitar la cafeína y el alcohol, especialmente por la tarde</li>
                    <li>Practicar técnicas de relajación antes de dormir</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cambios de humor */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Brain className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Cambios de Humor y Ansiedad</h3>
                <p className="text-gray-700 mb-4">
                  Las fluctuaciones hormonales pueden afectar los neurotransmisores cerebrales, provocando cambios de humor, irritabilidad, ansiedad y, en algunos casos, síntomas depresivos.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Practicar mindfulness y meditación</li>
                    <li>Ejercicio regular para liberar endorfinas</li>
                    <li>Mantener una red de apoyo social</li>
                    <li>Considerar terapia cognitivo-conductual</li>
                    <li>Consultar con un profesional si los síntomas son severos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sequedad vaginal */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Droplets className="text-pink-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-700 mb-2">Sequedad Vaginal y Cambios en la Libido</h3>
                <p className="text-gray-700 mb-4">
                  La disminución de estrógenos puede causar adelgazamiento y sequedad de los tejidos vaginales, lo que puede provocar molestias durante las relaciones sexuales y cambios en el deseo sexual.
                </p>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Usar lubricantes e hidratantes vaginales</li>
                    <li>Mantener una vida sexual activa</li>
                    <li>Ejercicios de Kegel para fortalecer el suelo pélvico</li>
                    <li>Considerar terapias locales con estrógenos (bajo supervisión médica)</li>
                    <li>Comunicación abierta con la pareja sobre los cambios experimentados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fatiga */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Activity className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-700 mb-2">Fatiga y Pérdida de Energía</h3>
                <p className="text-gray-700 mb-4">
                  Muchas mujeres experimentan cansancio y falta de energía durante la menopausia, lo que puede afectar su calidad de vida y productividad diaria.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Mantener una alimentación equilibrada y rica en nutrientes</li>
                    <li>Ejercicio regular adaptado a tu nivel de energía</li>
                    <li>Priorizar el descanso y mejorar la calidad del sueño</li>
                    <li>Gestionar el estrés mediante técnicas de relajación</li>
                    <li>Considerar suplementos (bajo supervisión médica)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cambios en la salud cardiovascular */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                <Heart className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-2">Cambios en la Salud Cardiovascular</h3>
                <p className="text-gray-700 mb-4">
                  La disminución de estrógenos puede afectar la salud del corazón y los vasos sanguíneos, aumentando el riesgo de enfermedades cardiovasculares después de la menopausia.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-700 mb-2">Estrategias de manejo:</h4>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Mantener una dieta saludable para el corazón</li>
                    <li>Ejercicio cardiovascular regular</li>
                    <li>Controlar la presión arterial y el colesterol</li>
                    <li>Evitar el tabaco y limitar el alcohol</li>
                    <li>Chequeos médicos regulares</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          ¿Cuándo Buscar Ayuda Médica?
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="text-gray-700 mb-4">
            Es importante consultar con un profesional de la salud si:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Los síntomas interfieren significativamente con tu calidad de vida</li>
            <li>Experimentas sangrado vaginal después de 12 meses sin menstruación</li>
            <li>Tienes sofocos muy intensos o frecuentes</li>
            <li>Presentas síntomas depresivos persistentes</li>
            <li>Sientes dolor durante las relaciones sexuales que no mejora con lubricantes</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Recuerda que cada mujer experimenta la menopausia de manera diferente, y lo que funciona para una puede no funcionar para otra. Un profesional de la salud puede ayudarte a encontrar las estrategias más adecuadas para ti.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Recursos Adicionales
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-4">
            En Maia, ofrecemos herramientas para ayudarte a monitorizar tus síntomas y recibir recomendaciones personalizadas:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li>Seguimiento diario de síntomas</li>
            <li>Planes personalizados según tus necesidades</li>
            <li>Acceso a profesionales especializados</li>
            <li>Comunidad de apoyo</li>
          </ul>
          <a
            href="https://maiacare.es/services-page/"
            className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar página de servicios
          </a>
        </div>
      </section>
    </div>
  );
};

export default SintomasMenopausia;