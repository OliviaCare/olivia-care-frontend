import React from 'react';

interface Plan {
  name: string;
  description: string;
  subheading?: string;
  features: string[];
  note?: string;
  href: string;
  badge?: string;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Plan Base - 5€/mes',
    description: 'Para empezar con herramientas básicas de apoyo',
    features: [
      'Plan personalizado según tus síntomas y objetivos',
      'Seguimiento de síntomas',
      'Contenido educativo exclusivo diseñado por expertos',
      'Conexión con nuestra comunidad Maia',
    ],
    href: 'https://buy.stripe.com/00w00jaay1mnesX0qjeIw00',
  },
  {
    name: 'Plan PRO - 50€/mes',
    badge: 'Recomendado',
    highlighted: true,
    description: 'Para vivir esta etapa con acompañamiento experto',
    subheading: 'Plan Base + beneficios exclusivos',
    features: [
      'Mayor personalización del plan',
      'Seguimiento avanzado de síntomas',
      'Videoconsulta mensual con una profesional',
      'Chat directo con expertas',
    ],
    href: 'https://buy.stripe.com/bJe5kD96u2qrfx1b4XeIw02',
  },
  {
    name: 'Consulta puntual - 100€',
    description: 'Para resolver tus dudas con una profesional',
    subheading: 'Sin suscripción',
    features: [
      'Videoconsulta individual',
      'Orientación personalizada',
      'Revisión de síntomas o preocupaciones',
    ],
    note: 'Video consulta de seguimiento - 55€',
    href: 'https://buy.stripe.com/28E6oH0zY6GH1Gbc91eIw01',
  },
];

const PricingPlans: React.FC = () => {
  return (
    <section className="bg-white p-6 md:p-10 rounded-lg shadow-md">
      <p className="text-sm font-semibold uppercase tracking-wide text-olivia-primary mb-2">
        Planes Maia
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
        Elige cómo quieres cuidarte
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {PLANS.map((plan) => {
          const dark = plan.highlighted;
          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-6 md:p-8 ${
                dark
                  ? 'bg-gradient-to-br from-[#2d2350] to-[#1b1630] text-white shadow-xl'
                  : 'bg-white text-gray-800 border border-purple-100 shadow-sm'
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-2 ${
                  dark ? 'text-white' : 'text-olivia-primary'
                }`}
              >
                {plan.name}
              </h3>

              {plan.badge && (
                <span className="self-start mb-3 inline-block rounded-full bg-purple-100 text-olivia-primary text-sm font-medium px-3 py-1">
                  {plan.badge}
                </span>
              )}

              <p className={`mb-5 ${dark ? 'text-gray-200' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {plan.subheading && (
                <p className={`font-semibold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.subheading}
                </p>
              )}

              <hr className={`mb-5 ${dark ? 'border-white/20' : 'border-gray-200'}`} />

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span
                      className={`mt-2 mr-3 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                        dark ? 'bg-purple-300' : 'bg-olivia-primary'
                      }`}
                    />
                    <span className={dark ? 'text-gray-100' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.note && (
                <p className={`font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {plan.note}
                </p>
              )}

              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto block text-center px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
                  dark
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-olivia-primary text-white hover:bg-purple-700'
                }`}
              >
                Empieza hoy
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingPlans;
