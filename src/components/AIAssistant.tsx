import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, AlertTriangle, Info, PhoneCall, Calendar, MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react';
import { getAIResponse, getFallbackResponse } from '../services/aiService';

interface Message {
  role: 'user' | 'assistant' | 'error' | 'system';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useLocalMode, setUseLocalMode] = useState(true); // Iniciar en modo local por defecto
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: '¡Hola! Soy Olivia, tu asistente virtual especializada en menopausia. Estoy aquí para responder tus preguntas, ofrecer apoyo y compartir información basada en evidencia científica. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      let response;
      
      if (useLocalMode) {
        // Usar el modo local/fallback para desarrollo o cuando la API no está disponible
        response = getFallbackResponse(userMessage);
        // Simular un pequeño retraso para que parezca que está procesando
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        try {
          // Intentar usar el modelo de IA
          response = await getAIResponse(userMessage);
        } catch (aiError) {
          console.error('Error con el modelo de IA, cambiando a modo local:', aiError);
          
          // Notificar al usuario del cambio a modo local
          setMessages(prev => [...prev, {
            role: 'system',
            content: 'Cambiando automáticamente a modo local debido a un problema con el servicio de IA.',
            timestamp: new Date()
          }]);
          
          // Cambiar a modo local y obtener respuesta de fallback
          setUseLocalMode(true);
          response = getFallbackResponse(userMessage);
        }
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    } catch (error: any) {
      console.error('Error general:', error);
      
      setError(error.message || 'Error al procesar tu pregunta');
      setMessages(prev => [...prev, {
        role: 'error',
        content: 'Lo siento, ha ocurrido un error al procesar tu pregunta. Estamos cambiando al modo local para seguir asistiéndote.',
        timestamp: new Date()
      }]);
      
      // Cambiar automáticamente al modo local si hay un error
      setUseLocalMode(true);
      
      // Proporcionar una respuesta de fallback
      const fallbackResponse = getFallbackResponse(userMessage);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: fallbackResponse, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setUseLocalMode(!useLocalMode);
    setMessages(prev => [
      ...prev, 
      { 
        role: 'system', 
        content: !useLocalMode 
          ? 'Cambiado a modo local. Las respuestas se generarán sin conexión a internet.' 
          : 'Cambiado a modo en línea. Las respuestas se generarán usando el modelo de IA.', 
        timestamp: new Date() 
      }
    ]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
      <div className="p-4 border-b bg-purple-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-purple-800 flex items-center">
            <Bot className="mr-2" size={24} />
            Olivia - Tu Asistente Virtual
          </h2>
          <button 
            onClick={toggleMode}
            className="flex items-center px-3 py-1 rounded-full bg-white text-purple-700 hover:bg-purple-100 transition-colors"
          >
            {useLocalMode ? (
              <>
                <ToggleLeft size={18} className="mr-1" />
                <span className="text-xs">Modo Local</span>
              </>
            ) : (
              <>
                <ToggleRight size={18} className="mr-1" />
                <span className="text-xs">Modo IA</span>
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-gray-600 flex items-center">
          <Info size={16} className="mr-1" />
          Especializada en bienestar durante la menopausia
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-b">
          <div className="flex items-center text-red-600">
            <AlertTriangle size={20} className="mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-purple-100 ml-4'
                  : message.role === 'error'
                  ? 'bg-red-50 mr-4'
                  : message.role === 'system'
                  ? 'bg-yellow-50 mr-4'
                  : 'bg-gray-100 mr-4'
              }`}
            >
              <div className="flex items-start mb-1">
                {message.role === 'assistant' ? (
                  <Bot size={16} className="mr-2 text-purple-600" />
                ) : message.role === 'error' ? (
                  <AlertTriangle size={16} className="mr-2 text-red-600" />
                ) : message.role === 'system' ? (
                  <Info size={16} className="mr-2 text-yellow-600" />
                ) : (
                  <User size={16} className="mr-2 text-purple-600" />
                )}
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className={`whitespace-pre-wrap ${
                message.role === 'error' ? 'text-red-600' :
                message.role === 'system' ? 'text-yellow-700' :
                'text-gray-800'
              }`}>{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader className="animate-spin text-purple-600" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="¿Qué te gustaría saber sobre la menopausia?"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            La información proporcionada es de carácter general y no sustituye el consejo médico profesional.
          </p>
          <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600">
            {useLocalMode ? 'Respuestas locales' : 'Respuestas con IA'}
          </span>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;