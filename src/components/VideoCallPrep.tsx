import React from 'react';
import { Video, CheckCircle, Coffee, Wifi } from 'lucide-react';

interface VideoCallPrepProps {
  appointmentTime: string;
  doctorName: string;
  onJoin: () => void;
}

const VideoCallPrep: React.FC<VideoCallPrepProps> = ({ appointmentTime, doctorName, onJoin }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Preparación para tu consulta virtual</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Video className="text-purple-600 mt-1" size={24} />
          <div>
            <h3 className="font-semibold">Tu cita está programada para:</h3>
            <p className="text-gray-600">{appointmentTime} con {doctorName}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Lista de verificación:</h3>
          <div className="space-y-2">
            <ChecklistItem text="Asegúrate de tener una conexión estable a Internet" icon={<Wifi size={20} />} />
            <ChecklistItem text="Encuentra un lugar tranquilo y bien iluminado" icon={<Coffee size={20} />} />
            <ChecklistItem text="Prueba tu cámara y micrófono" icon={<Video size={20} />} />
            <ChecklistItem text="Ten a mano cualquier resultado o informe médico relevante" icon={<CheckCircle size={20} />} />
          </div>
        </div>

        <button
          onClick={onJoin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Unirse a la consulta
        </button>
      </div>
    </div>
  );
};

const ChecklistItem: React.FC<{ text: string; icon: React.ReactNode }> = ({ text, icon }) => (
  <div className="flex items-center space-x-2 text-gray-700">
    {icon}
    <span>{text}</span>
  </div>
);

export default VideoCallPrep;