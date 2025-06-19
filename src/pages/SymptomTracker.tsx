import React, { useState, useEffect } from 'react';
import { Calendar, ThermometerSun, Brain, Heart, Moon, Battery, Droplets, Activity, AlertCircle, MessageSquare, CheckCircle, X, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logSymptoms } from '../services/symptomService';

const symptoms = [
  { 
    id: 'hotFlashes', 
    name: 'Sofocos',
    icon: <ThermometerSun className="text-red-500" />, 
    color: '#ef4444',
    scale: [
      'Sin sofocos',
      'Leves y ocasionales',
      'Moderados y frecuentes',
      'Severos y muy frecuentes'
    ]
  },
  { 
    id: 'anxiety', 
    name: 'Ansiedad',
    icon: <Brain className="text-purple-500" />, 
    color: '#8b5cf6',
    scale: [
      'Sin ansiedad',
      'Ansiedad leve',
      'Ansiedad moderada',
      'Ansiedad severa'
    ]
  },
  { 
    id: 'digestiveIssues', 
    name: 'Problemas digestivos',
    icon: <AlertCircle className="text-orange-500" />, 
    color: '#f59e0b',
    scale: [
      'Sin molestias',
      'Molestias leves',
      'Molestias moderadas',
      'Molestias severas'
    ]
  },
  { 
    id: 'dryness', 
    name: 'Sequedad',
    icon: <Droplets className="text-blue-500" />, 
    color: '#3b82f6',
    scale: [
      'Sin sequedad',
      'Sequedad leve',
      'Sequedad moderada',
      'Sequedad severa'
    ]
  },
  { 
    id: 'insomnia', 
    name: 'Insomnio',
    icon: <Moon className="text-indigo-500" />, 
    color: '#6366f1',
    scale: [
      'Buen sueño',
      'Dificultad ocasional',
      'Dificultad frecuente',
      'Insomnio severo'
    ]
  },
  { 
    id: 'fatigue', 
    name: 'Fatiga',
    icon: <Battery className="text-pink-500" />, 
    color: '#ec4899',
    scale: [
      'Sin fatiga',
      'Fatiga leve',
      'Fatiga moderada',
      'Fatiga severa'
    ]
  }
];

const triggers = [
  { id: 'alcohol', name: 'Consumo de alcohol' },
  { id: 'caffeine', name: 'Consumo de cafeína' },
  { id: 'stress', name: 'Situaciones de estrés' },
  { id: 'temperature', name: 'Exposición a cambios de temperatura' },
  { id: 'medications', name: 'Medicamentos' },
  { id: 'intimacy', name: 'Actividad sexual/relación de pareja' },
  { id: 'work', name: 'Situaciones laborales' },
  { id: 'travel', name: 'Viajes/desplazamientos' }
];

const activities = [
  { 
    id: 'exercise',
    name: 'Ejercicio físico',
    hasDetails: true,
    detailsType: 'text',
    placeholder: 'Tipo y duración del ejercicio'
  },
  { 
    id: 'healthyDiet',
    name: 'Alimentación saludable',
    hasDetails: true,
    detailsType: 'text',
    placeholder: 'Comidas principales del día'
  },
  { 
    id: 'kegels',
    name: 'Ejercicios de Kegel',
    hasDetails: false
  },
  { 
    id: 'mindfulness',
    name: 'Práctica de mindfulness/relajación',
    hasDetails: false
  },
  { 
    id: 'intimacy',
    name: 'Actividad sexual',
    hasDetails: false
  },
  { 
    id: 'supplements',
    name: 'Toma de suplementos',
    hasDetails: true,
    detailsType: 'text',
    placeholder: 'Especifica los suplementos'
  }
];

const SymptomTracker: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [symptomIntensities, setSymptomIntensities] = useState<{ [key: string]: number }>({});
  const [activeTriggersMap, setActiveTriggersMap] = useState<{ [key: string]: boolean }>({});
  const [activitiesMap, setActivitiesMap] = useState<{ [key: string]: boolean }>({});
  const [activityDetails, setActivityDetails] = useState<{ [key: string]: string }>({});
  const [notes, setNotes] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSymptomChange = (symptomId: string, intensity: number) => {
    setSymptomIntensities(prev => ({ ...prev, [symptomId]: intensity }));
  };

  const toggleTrigger = (triggerId: string) => {
    setActiveTriggersMap(prev => ({ ...prev, [triggerId]: !prev[triggerId] }));
  };

  const toggleActivity = (activityId: string) => {
    setActivitiesMap(prev => ({ ...prev, [activityId]: !prev[activityId] }));
  };

  const handleActivityDetailChange = (activityId: string, details: string) => {
    setActivityDetails(prev => ({ ...prev, [activityId]: details }));
  };

  const handleSave = async () => {
    if (!currentUser) {
      setSaveError('Debes iniciar sesión para guardar el registro');
      return;
    }

    setLoading(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const dailyLog = {
        userId: currentUser.uid,
        date: selectedDate,
        symptoms: symptomIntensities,
        triggers: Object.keys(activeTriggersMap).filter(key => activeTriggersMap[key]),
        activities: Object.keys(activitiesMap)
          .filter(key => activitiesMap[key])
          .map(key => ({
            id: key,
            details: activityDetails[key] || ''
          })),
        notes
      };

      await logSymptoms({
        userId: currentUser.uid,
        date: selectedDate,
        symptoms: symptomIntensities,
        notes: notes
      });

      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);

    } catch (error: any) {
      console.error('Error saving symptom log:', error);
      setSaveError('Error al guardar el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-800">Registro Diario de Síntomas</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
              className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-lg hover:bg-purple-50"
            >
              &lt; Anterior
            </button>
            <span className="font-semibold px-4 py-2 bg-purple-50 rounded-lg">
              {selectedDate.toLocaleDateString('es-ES', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <button 
              onClick={() => handleDateChange(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
              className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-lg hover:bg-purple-50"
            >
              Siguiente &gt;
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center animate-fade-in">
            <CheckCircle size={20} className="mr-2" />
            Registro guardado exitosamente
          </div>
        )}

        {saveError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-fade-in">
            <X size={20} className="mr-2" />
            {saveError}
          </div>
        )}

        <div className="space-y-8">
          {/* Síntomas */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Síntomas</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Info size={16} className="mr-1" />
                Desliza para indicar la intensidad
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {symptoms.map(symptom => (
                <div key={symptom.id} className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3">
                        {symptom.icon}
                      </div>
                      <span className="font-medium text-gray-800">{symptom.name}</span>
                    </div>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100">
                      {symptomIntensities[symptom.id] || 0}/3
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={symptomIntensities[symptom.id] || 0}
                    onChange={(e) => handleSymptomChange(symptom.id, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${symptom.color} ${(symptomIntensities[symptom.id] || 0) * 33.33}%, #e5e7eb ${(symptomIntensities[symptom.id] || 0) * 33.33}%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {symptom.scale.map((label, index) => (
                      <span key={index} className="text-center" style={{ width: '25%' }}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Factores Desencadenantes */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Factores Desencadenantes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {triggers.map(trigger => (
                <button
                  key={trigger.id}
                  onClick={() => toggleTrigger(trigger.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    activeTriggersMap[trigger.id]
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <span className="block text-sm">{trigger.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Actividades */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Actividades Realizadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map(activity => (
                <div key={activity.id} className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={activity.id}
                      checked={activitiesMap[activity.id] || false}
                      onChange={() => toggleActivity(activity.id)}
                      className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <label htmlFor={activity.id} className="ml-3 font-medium text-gray-700">
                      {activity.name}
                    </label>
                  </div>
                  {activity.hasDetails && activitiesMap[activity.id] && (
                    <input
                      type="text"
                      value={activityDetails[activity.id] || ''}
                      onChange={(e) => handleActivityDetailChange(activity.id, e.target.value)}
                      placeholder={activity.placeholder}
                      className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Notas Adicionales */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notas Adicionales</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="¿Cómo te has sentido hoy? ¿Alguna observación importante?"
              className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </section>

          <button
            onClick={handleSave}
            disabled={loading}
            className={`w-full bg-purple-600 text-white py-4 rounded-xl transition-all flex items-center justify-center ${
              loading ? 'bg-purple-400 cursor-not-allowed' : 'hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Guardar Registro'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SymptomTracker;