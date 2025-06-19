import React from 'react';
import { FileText, Download } from 'lucide-react';

const GuiaSobreLaMenopausia = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        Guía Completa sobre la Menopausia
      </h1>
      <p className="text-gray-600 mb-6">
        Guía informativa detallada sobre la menopausia, sus síntomas, tratamientos y recomendaciones para mejorar la calidad de vida durante esta etapa.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Contenido de la Guía
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li className="mb-2">
            <strong>Información detallada sobre la menopausia y sus etapas</strong>, desde la perimenopausia hasta la postmenopausia.
          </li>
          <li className="mb-2">
            <strong>Síntomas comunes</strong> como sofocos, cambios de humor, insomnio y sequedad vaginal, y cómo manejarlos.
          </li>
          <li className="mb-2">
            <strong>Cambios físicos y emocionales</strong> que ocurren durante esta etapa y su impacto en la vida diaria.
          </li>
          <li className="mb-2">
            <strong>Opciones de tratamiento disponibles</strong>, desde terapias hormonales hasta alternativas naturales.
          </li>
          <li className="mb-2">
            <strong>Recomendaciones de estilo de vida</strong> para mejorar el bienestar durante la menopausia.
          </li>
          <li className="mb-2">
            <strong>Consejos para mantener la salud ósea</strong> y prevenir la osteoporosis.
          </li>
          <li className="mb-2">
            <strong>Información sobre salud sexual</strong> durante y después de la menopausia.
          </li>
        </ul>
      </section>

      <section className="mb-8 bg-purple-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Descarga la Guía
        </h2>
        <div className="flex items-center mb-4">
          <FileText size={24} className="text-purple-600 mr-3" />
          <p className="text-gray-700">
            Descarga la guía completa en formato PDF para leerla cuando quieras, incluso sin conexión a internet.
          </p>
        </div>
        <a
          href="https://www.change-the-face.com/wp-content/uploads/2021/03/Espanol-Guia-sobre-la-menopausia-.pdf"
          className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={20} className="mr-2" />
          Descargar Guía Completa (PDF)
        </a>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          ¿Por qué es importante esta guía?
        </h2>
        <p className="text-gray-700 mb-4">
          La menopausia es una etapa natural en la vida de toda mujer, pero a menudo viene acompañada de cambios físicos y emocionales que pueden resultar desafiantes. Estar bien informada te ayudará a:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li className="mb-2">Entender mejor los cambios que experimenta tu cuerpo</li>
          <li className="mb-2">Tomar decisiones informadas sobre tu salud</li>
          <li className="mb-2">Comunicarte de manera efectiva con los profesionales de la salud</li>
          <li className="mb-2">Implementar estrategias para mejorar tu calidad de vida</li>
          <li className="mb-2">Sentirte más segura y en control durante esta etapa</li>
        </ul>
      </section>
    </div>
  );
};

export default GuiaSobreLaMenopausia;