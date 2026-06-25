import { HfInference } from '@huggingface/inference';

// Verificar si la API key está disponible
const hfApiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

// Inicializar el cliente de Hugging Face
const hf = new HfInference(hfApiKey);

// Modelo a utilizar - usando un modelo más pequeño y estable
const MODEL_ID = "mistralai/Mistral-7B-Instruct-v0.2";

const systemPrompt = `Eres Maia, una asistente especializada en menopausia, diseñada específicamente para apoyar a mujeres durante esta etapa vital.

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
  if (!hfApiKey) {
    throw new Error('API key de Hugging Face no configurada. Usando modo local.');
  }

  try {
    // Usar chat-completion en lugar de text-generation para modelos de chat
    const response = await hf.textGeneration({
      model: MODEL_ID,
      inputs: `<s>[INST] ${systemPrompt} 

${userMessage} [/INST]`,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        repetition_penalty: 1.1,
        do_sample: true
      }
    });

    // Extraer y limpiar la respuesta
    let generatedText = response.generated_text || '';
    
    // Limpiar la respuesta para quitar el prompt inicial si está presente
    if (generatedText.includes('[/INST]')) {
      generatedText = generatedText.split('[/INST]')[1].trim();
    }

    return generatedText || 'Lo siento, no pude procesar tu pregunta.';
  } catch (error) {
    console.error('Error llamando al modelo de IA:', error);
    // Cambiar a modo local automáticamente
    return getFallbackResponse(userMessage);
  }
};

// Función alternativa que usa un enfoque de respuesta local para desarrollo o cuando la API no está disponible
export const getFallbackResponse = (userMessage: string) => {
  // Convertir el mensaje a minúsculas para facilitar la búsqueda de palabras clave
  const userMessageLower = userMessage.toLowerCase();
  
  // Respuestas predefinidas para preguntas comunes
  const commonResponses = [
    {
      keywords: ['sofoco', 'sofocos', 'calor', 'sudor'],
      response: 'Los sofocos son uno de los síntomas más comunes de la menopausia. Para manejarlos, puedes intentar:\n\n• Mantener un ambiente fresco\n• Vestir en capas que puedas quitar fácilmente\n• Evitar desencadenantes como alcohol, cafeína y comidas picantes\n• Practicar técnicas de respiración profunda\n• Considerar terapias complementarias como acupuntura\n\nSi los sofocos afectan significativamente tu calidad de vida, consulta con tu médico sobre opciones de tratamiento.'
    },
    {
      keywords: ['dormir', 'insomnio', 'sueño', 'descanso', 'despertar'],
      response: 'Los problemas de sueño son frecuentes durante la menopausia. Algunas estrategias que pueden ayudar incluyen:\n\n• Mantener un horario regular de sueño\n• Crear una rutina relajante antes de dormir\n• Mantener la habitación fresca, oscura y silenciosa\n• Evitar cafeína y alcohol antes de acostarte\n• Practicar técnicas de relajación como meditación\n• Considerar suplementos naturales como melatonina (consulta con tu médico)\n\nSi el insomnio persiste, es importante buscar ayuda profesional.'
    },
    {
      keywords: ['ansiedad', 'nervios', 'estres', 'estrés', 'preocupación', 'preocupacion', 'angustia'],
      response: 'La ansiedad puede aumentar durante la menopausia debido a los cambios hormonales. Algunas técnicas que pueden ayudar son:\n\n• Practicar mindfulness y meditación diariamente\n• Ejercicio regular, especialmente yoga y tai chi\n• Técnicas de respiración profunda\n• Mantener un diario de emociones\n• Reducir el consumo de cafeína\n• Establecer límites saludables en tus relaciones\n\nSi la ansiedad interfiere con tu vida diaria, considera buscar apoyo profesional con un psicólogo o psiquiatra.'
    },
    {
      keywords: ['sequedad', 'vaginal', 'lubricación', 'lubricacion', 'íntima', 'intima', 'relaciones sexuales'],
      response: 'La sequedad vaginal es común durante la menopausia debido a la disminución de estrógenos. Puedes considerar:\n\n• Usar lubricantes vaginales o hidratantes regularmente\n• Mantener una vida sexual activa\n• Consultar con tu médico sobre terapias locales con estrógenos\n• Mantenerte hidratada bebiendo suficiente agua\n• Evitar productos de higiene íntima con perfumes o químicos irritantes\n\nEste síntoma es completamente tratable, así que no dudes en hablar con tu médico si te afecta.'
    },
    {
      keywords: ['peso', 'engordar', 'adelgazar', 'metabolismo', 'dieta'],
      response: 'Los cambios en el metabolismo durante la menopausia pueden contribuir al aumento de peso. Algunas estrategias incluyen:\n\n• Ajustar la ingesta calórica a tu nuevo metabolismo\n• Aumentar la actividad física con énfasis en ejercicios de fuerza\n• Priorizar proteínas y fibra en tu dieta\n• Reducir carbohidratos refinados y azúcares\n• Mantener un registro de alimentación\n• Considerar el ayuno intermitente (consulta con tu médico)\n\nRecuerda que el objetivo principal debe ser la salud, no solo el peso.'
    },
    {
      keywords: ['tratamiento', 'terapia', 'hormonal', 'medicamento', 'pastillas'],
      response: 'Existen varios enfoques para manejar los síntomas de la menopausia:\n\n• Terapia hormonal: Puede ser efectiva para sofocos, sequedad vaginal y prevención de osteoporosis. Debe ser personalizada y supervisada médicamente.\n\n• Tratamientos no hormonales: Medicamentos como antidepresivos a dosis bajas, gabapentina o clonidina pueden ayudar con los sofocos.\n\n• Terapias complementarias: Fitoestrógenos, acupuntura, mindfulness.\n\n• Cambios en el estilo de vida: Ejercicio regular, dieta equilibrada, técnicas de manejo del estrés.\n\nLa decisión sobre el tratamiento debe tomarse en consulta con tu médico, considerando tu historial médico y preferencias personales.'
    },
    {
      keywords: ['depresión', 'depresion', 'tristeza', 'ánimo', 'animo', 'melancolía', 'melancolia'],
      response: 'Los cambios de humor y la depresión pueden ocurrir durante la menopausia. Algunas recomendaciones:\n\n• Busca apoyo profesional con un psicólogo o psiquiatra\n• Mantén una rutina de ejercicio regular\n• Prioriza actividades que te generen placer y satisfacción\n• Conecta con amigos y familiares\n• Considera unirte a un grupo de apoyo\n• Aprende técnicas de manejo del estrés\n\nRecuerda que la depresión es una condición médica tratable y no es una debilidad personal.'
    },
    {
      keywords: ['memoria', 'concentración', 'concentracion', 'niebla mental', 'olvido', 'olvidar'],
      response: 'Los problemas de memoria y concentración son comunes durante la menopausia. Algunas estrategias útiles:\n\n• Ejercicio aeróbico regular\n• Desafíos mentales como puzzles, lectura o aprender nuevas habilidades\n• Técnicas de mindfulness y meditación\n• Mantener una buena higiene del sueño\n• Alimentación rica en antioxidantes y ácidos grasos omega-3\n• Usar herramientas como listas, recordatorios y aplicaciones\n\nSi los problemas cognitivos son severos o interfieren significativamente con tu vida diaria, consulta con tu médico.'
    },
    {
      keywords: ['libido', 'deseo sexual', 'apetito sexual', 'sexualidad'],
      response: 'La disminución de la libido es común durante la menopausia. Algunas sugerencias:\n\n• Comunicación abierta con tu pareja sobre tus necesidades\n• Explorar nuevas formas de intimidad y conexión\n• Usar lubricantes para mayor comodidad\n• Ejercicio regular para mejorar el flujo sanguíneo y los niveles de energía\n• Considerar terapia sexual o de pareja\n• Consultar con tu médico sobre opciones hormonales o no hormonales\n\nRecuerda que la sexualidad evoluciona a lo largo de la vida y es normal experimentar cambios.'
    },
    {
      keywords: ['osteoporosis', 'huesos', 'fracturas', 'calcio', 'densidad ósea'],
      response: 'La pérdida de densidad ósea aumenta durante la menopausia. Para mantener la salud ósea:\n\n• Asegura una ingesta adecuada de calcio (1200mg/día)\n• Mantén niveles óptimos de vitamina D\n• Realiza ejercicios con carga de peso regularmente\n• Evita el tabaco y limita el alcohol\n• Considera una densitometría ósea\n• Habla con tu médico sobre medicamentos preventivos si tienes factores de riesgo\n\nLa prevención temprana es clave para evitar fracturas en el futuro.'
    }
  ];

  // Buscar coincidencias en las palabras clave
  for (const item of commonResponses) {
    if (item.keywords.some(keyword => userMessageLower.includes(keyword))) {
      return item.response;
    }
  }

  // Respuesta genérica si no se encuentra una coincidencia
  return 'Gracias por tu pregunta sobre la menopausia. Como asistente virtual, puedo ofrecerte información sobre diversos aspectos como:\n\n• Síntomas físicos (sofocos, insomnio, sequedad vaginal)\n• Cambios emocionales (ansiedad, depresión, irritabilidad)\n• Opciones de tratamiento (terapia hormonal, alternativas naturales)\n• Estilo de vida y bienestar (ejercicio, nutrición, mindfulness)\n• Salud ósea y prevención de osteoporosis\n• Sexualidad y relaciones\n\n¿Podrías ser más específica sobre qué aspecto de la menopausia te interesa conocer?';
};