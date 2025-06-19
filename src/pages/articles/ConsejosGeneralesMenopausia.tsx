import React from 'react';

const ConsejosGeneralesMenopausia = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Consejos Generales para la Menopausia</h1>
      <p className="text-gray-600 mb-6">
        Información y consejos del Ministerio de Sanidad para afrontar la menopausia.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Consejos del Ministerio de Sanidad
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li className="mb-2">
            <strong>Alimentación Saludable:</strong> Dieta rica en calcio y vitamina D para mantener la salud ósea. Consumir lácteos, pescados, legumbres y vegetales de hoja verde.
          </li>
          <li className="mb-2">
            <strong>Ejercicio Regular:</strong> Actividad física para mantener la salud ósea y cardiovascular. Se recomienda caminar, nadar o practicar yoga al menos 30 minutos diarios.
          </li>
          <li className="mb-2">
            <strong>Higiene del Sueño:</strong> Establecer rutinas para mejorar la calidad del sueño, evitando estimulantes como cafeína y alcohol antes de dormir.
          </li>
          <li className="mb-2">
            <strong>Manejo del Estrés:</strong> Técnicas de relajación y mindfulness para controlar los cambios de humor y la ansiedad.
          </li>
          <li className="mb-2">
            <strong>Revisiones Médicas:</strong> Consultar regularmente con un profesional de la salud para monitorizar cambios hormonales y prevenir osteoporosis.
          </li>
          <li className="mb-2">
            <strong>Control de Peso:</strong> Mantener un peso saludable para reducir los sofocos y mejorar el bienestar general.
          </li>
          <li className="mb-2">
            <strong>Hidratación:</strong> Beber suficiente agua para mantener la piel hidratada y aliviar la sequedad.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Recursos Adicionales
        </h2>
        <div className="bg-purple-50 p-6 rounded-lg">
          <p className="mb-4 text-gray-700">
            El Ministerio de Sanidad ofrece una guía completa con consejos prácticos para mujeres en la etapa de la menopausia.
          </p>
          <a
            href="https://www.sanidad.gob.es/ca/ciudadanos/proteccionSalud/mujeres/docs/ConsejosMenopausia.pdf?utm_source=chatgpt.com"
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar PDF del Ministerio de Sanidad
          </a>
        </div>
      </section>
    </div>
  );
};

export default ConsejosGeneralesMenopausia;