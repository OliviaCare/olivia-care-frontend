import React from 'react';

const steps = [
  {
    title: 'Evalúa tus síntomas',
    text: 'Conoce en qué puntos necesitas más apoyo y descubre los primeros pasos para vivir mejor tu menopausia.',
  },
  {
    title: 'Consulta con nuestras expertas',
    text: 'Nuestro equipo de profesionales multidisciplinares te dará una guía clara desde el principio y te orientarán en el mejor plan para ti.',
  },
  {
    title: 'Haz seguimiento de tu progreso',
    text: 'Todos nuestros planes están pensados para que puedas disfrutar de un bienestar duradero, adaptándose a tus necesidades a lo largo del tiempo.',
  },
];

const reviews = [
  {
    text: 'Busqué ayuda porque dormía fatal y estaba cansada todo el día. Empecé a seguir las pautas que me dieron de nutrición, descanso y ejercicio y en unas semanas me encontraba incluso mejor que antes.',
    author: 'Marta, 52 años.',
  },
  {
    text: 'Salí de la sesión con cambios concretos, no con consejos generales que no sabes cómo seguir después. Muy recomendable para reducir los sofocos y el insomnio del principio.',
    author: 'Ana, 49 años.',
  },
  {
    text: 'Me hicieron sentir muy cómoda desde el primer momento. Hay algunos hábitos que no puedo cambiar por motivos personales y se adaptaron a mis circunstancias perfectamente.',
    author: 'Laura, 55 años.',
  },
  {
    text: 'Todo el mundo te dice lo que pasa con la menopausia, pero nadie te dice qué hacer cuando llega. Les diría a todas las mujeres que busquen este tipo de ayuda, no tienen por qué pasarlo solas.',
    author: 'Carmen, 50 años.',
  },
];

const faqs = [
  {
    q: '¿Qué diferencia a Maia de otras soluciones para la menopausia?',
    a: 'Maia ofrece un enfoque multidisciplinario y adaptado a cada mujer, integrando expertos en salud femenina y tecnología para brindar apoyo integral en esta etapa.',
  },
  {
    q: '¿Es Maia adecuada para cualquier etapa de la menopausia?',
    a: 'Sí, en Maia ofrecemos apoyo tanto para la perimenopausia como para la postmenopausia. Nuestros planes se ajustan a tus necesidades específicas en cada etapa para ayudarte a gestionar los síntomas y vivir de forma plena.',
  },
  {
    q: '¿Reemplaza Maia a mi doctor?',
    a: 'No, Maia no reemplaza ni recomienda tratamientos médicos sino que busca aliviar los síntomas de las mujeres a través de planes de bienestar creados por expertos en fitness, nutrición, mindfullness, entre otras disciplinas.',
  },
];

const RegisterLanding: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Cómo funciona */}
      <section className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center">
          Cómo funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-olivia-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reseñas */}
      <section className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center">
          Lo que dicen las usuarias de Maia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-purple-50 p-6 rounded-2xl flex flex-col">
              <div className="text-yellow-400 text-lg mb-2" aria-label="5 de 5 estrellas">
                ★★★★★
              </div>
              <p className="text-gray-700 flex-grow">“{r.text}”</p>
              <p className="font-semibold text-gray-900 mt-4">{r.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-8 text-center">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.map((f, i) => (
            <details
              key={i}
              className="border border-purple-100 rounded-lg p-4 group"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <span className="ml-3 text-olivia-primary transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <p className="text-gray-600 mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RegisterLanding;
