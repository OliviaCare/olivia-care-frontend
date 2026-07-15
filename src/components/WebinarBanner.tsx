import React, { useState } from 'react';
import { Calendar, UserCheck } from 'lucide-react';

const FORM_NAME = 'webinar-sexualidad';
const SPEAKER_PHOTO = 'https://v.fastcdn.co/u/9a3c8ffe/65959719-0-Sonia-maia.webp';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');

const WebinarBanner: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;
    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, nombre, email }),
      });
      setStatus('ok');
    } catch (err) {
      console.error('Error enviando el formulario del webinar:', err);
      setStatus('error');
    }
  };

  return (
    <section className="rounded-2xl shadow-lg overflow-hidden mb-6 bg-gradient-to-br from-[#2d2350] to-[#1b1630] text-white">
      <div className="flex flex-col md:flex-row">
        {/* Foto de la ponente */}
        <div className="md:w-2/5">
          <img
            src={SPEAKER_PHOTO}
            alt="Sonia Ruiz Ortega"
            className="w-full h-56 md:h-full object-cover object-top"
          />
        </div>

        {/* Contenido */}
        <div className="md:w-3/5 p-6 md:p-8">
          <span className="inline-block bg-purple-500/30 text-purple-100 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Próximo webinar gratuito
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            Sexualidad en la Menopausia
          </h2>
          <p className="text-gray-200 mb-4">
            Recupera la confianza y el bienestar íntimo: aprende a vivir tu sexualidad
            en plenitud durante esta etapa.
          </p>

          <div className="flex items-center text-sm text-gray-200 mb-1">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            17 de septiembre · 18:00h
          </div>
          <div className="flex items-start text-sm text-gray-200 mb-5">
            <UserCheck size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>
              Con <strong>Sonia Ruiz Ortega</strong>, experta en salud sexual en las
              diferentes etapas de la mujer
            </span>
          </div>

          {status === 'ok' ? (
            <div className="bg-green-500/20 border border-green-400/40 text-green-50 rounded-lg p-4">
              ¡Gracias, {nombre.split(' ')[0]}! Te has apuntado al webinar. Te
              enviaremos los detalles a <strong>{email}</strong>.
            </div>
          ) : (
            <form
              name={FORM_NAME}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />
              <p className="hidden">
                <label>
                  No rellenar: <input name="bot-field" />
                </label>
              </p>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
                className="flex-1 p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                className="flex-1 p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-70"
              >
                {status === 'sending' ? 'Enviando…' : 'Apuntarme'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-200 text-sm mt-2">
              Hubo un problema al enviar. Por favor, inténtalo de nuevo.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebinarBanner;
