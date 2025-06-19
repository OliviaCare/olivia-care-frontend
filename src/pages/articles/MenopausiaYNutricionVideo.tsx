import React from 'react';

const MenopausiaYNutricionVideo = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">
        Menopausia y Nutrición: Video Informativo
      </h1>
      <p className="text-gray-600 mb-6">
        Video informativo sobre la relación entre la menopausia y la nutrición, con consejos prácticos para mejorar tu alimentación durante esta etapa.
      </p>

      <section className="mb-8">
        <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            className="w-full h-[400px]"
            src="https://www.youtube.com/embed/faEk8yHHGTk?t=20"
            title="Menopausia y Nutrición"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-4">
          Puntos Clave del Video
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li className="mb-2">
            <strong>Importancia de una dieta equilibrada</strong> durante la menopausia para controlar los síntomas y prevenir enfermedades.
          </li>
          <li className="mb-2">
            <strong>Alimentos ricos en calcio y vitamina D</strong> para mantener la salud ósea y prevenir la osteoporosis.
          </li>
          <li className="mb-2">
            <strong>Alimentos que ayudan a aliviar los sofocos</strong> y otros síntomas comunes de la menopausia.
          </li>
          <li className="mb-2">
            <strong>Consejos para mantener un peso saludable</strong> durante esta etapa de cambios hormonales.
          </li>
          <li className="mb-2">
            <strong>Fitoestrógenos naturales</strong> presentes en alimentos como la soja, que pueden ayudar a equilibrar los niveles hormonales.
          </li>
          <li className="mb-2">
            <strong>Hidratación adecuada</strong> para combatir la sequedad y mantener la salud general.
          </li>
        </ul>
      </section>

      <section className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          ¿Por qué es importante la nutrición durante la menopausia?
        </h2>
        <p className="text-gray-700 mb-4">
          Durante la menopausia, los cambios hormonales pueden afectar el metabolismo, la densidad ósea y la distribución de grasa corporal. Una alimentación adecuada puede ayudar a mitigar estos efectos y mejorar la calidad de vida durante esta etapa.
        </p>
        <p className="text-gray-700">
          Este video ofrece consejos prácticos basados en evidencia científica para adaptar tu alimentación a las necesidades específicas de la menopausia.
        </p>
      </section>
    </div>
  );
};

export default MenopausiaYNutricionVideo;