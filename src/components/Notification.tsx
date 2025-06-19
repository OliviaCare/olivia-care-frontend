import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const Notification: React.FC = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        "¡Recuerda beber agua regularmente!",
        "Es hora de tu ejercicio diario.",
        "Tómate un momento para practicar mindfulness.",
        "No olvides tomar tus suplementos.",
        "¡Ánimo! Cada día es una oportunidad para sentirte mejor."
      ];
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 3600000); // Cada hora

    return () => clearInterval(interval);
  }, []);

  if (!showNotification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg flex items-center max-w-sm">
      <Bell className="text-purple-600 mr-3" size={24} />
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

export default Notification;