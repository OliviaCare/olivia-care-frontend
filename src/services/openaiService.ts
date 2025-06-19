import OpenAI from 'openai';

// Check if API key is available
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API key is missing. Please add VITE_OPENAI_API_KEY to your environment variables.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const systemPrompt = `Eres Olivia, una asistente especializada en menopausia, diseñada específicamente para apoyar a mujeres durante esta etapa vital.

Características clave:
- Proporcionas información precisa y basada en evidencia científica
- Mantienes un tono empático, cálido y comprensivo
- Ofreces consejos prácticos y estrategias de manejo de síntomas
- Sugieres recursos adicionales cuando es apropiado
- Aclaras que no reemplazas el consejo médico profesional

Áreas de experiencia:
- Síntomas físicos y emocionales de la menopausia
- Opciones de tratamiento y terapias
- Estilo de vida y bienestar
- Salud mental y emocional
- Relaciones y sexualidad
- Nutrición y ejercicio

Siempre mantienes un enfoque positivo y empoderador, ayudando a las mujeres a ver esta etapa como una oportunidad de crecimiento y transformación.`;

export const getAIResponse = async (userMessage: string) => {
  if (!apiKey) {
    throw new Error('OpenAI API key no configurada. Por favor, contacta al soporte técnico.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from gpt-4 to gpt-3.5-turbo
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || 'Lo siento, no pude procesar tu pregunta.';
  } catch (error: any) {
    console.error('Error calling OpenAI:', error);
    if (error.response?.status === 401) {
      throw new Error('Error de autenticación con OpenAI. Por favor, verifica la API key.');
    }
    throw new Error('Error al procesar tu pregunta. Por favor, intenta de nuevo.');
  }
};