import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Target, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import PricingPlans from './PricingPlans';

interface WellnessDashboardProps {
  cervantesResults: {
    menopausiaySalud: number;
    psiquico: number;
    sexualidad: number;
    relacionPareja: number;
    total: number;
    history?: Array<{
      date: string;
      menopausiaySalud: number;
      psiquico: number;
      sexualidad: number;
      relacionPareja: number;
    }>;
  };
}

const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ cervantesResults }) => {
  const radarData = [
    {
      dimension: 'Físico',
      value: (cervantesResults.menopausiaySalud / 20) * 100,
      raw: cervantesResults.menopausiaySalud,
      maxScore: 20,
      fullMark: 100
    },
    {
      dimension: 'Psíquico',
      value: (cervantesResults.psiquico / 20) * 100,
      raw: cervantesResults.psiquico,
      maxScore: 20,
      fullMark: 100
    },
    {
      dimension: 'Sexualidad',
      value: (cervantesResults.sexualidad / 16) * 100,
      raw: cervantesResults.sexualidad,
      maxScore: 16,
      fullMark: 100
    },
    {
      dimension: 'Pareja',
      value: (cervantesResults.relacionPareja / 12) * 100,
      raw: cervantesResults.relacionPareja,
      maxScore: 12,
      fullMark: 100
    }
  ];

  const getQualityOfLifeLevel = (total: number) => {
    const percentage = (total / 68) * 100;
    if (percentage <= 25) return { level: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-600' };
    if (percentage <= 50) return { level: 'Buena', color: 'text-blue-600', bgColor: 'bg-blue-600' };
    if (percentage <= 75) return { level: 'Regular', color: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    return { level: 'Necesita atención', color: 'text-red-600', bgColor: 'bg-red-600' };
  };

  const getDomainLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage <= 25) return { level: 'Leve', color: 'text-green-600' };
    if (percentage <= 50) return { level: 'Moderado', color: 'text-blue-600' };
    if (percentage <= 75) return { level: 'Significativo', color: 'text-yellow-600' };
    return { level: 'Severo', color: 'text-red-600' };
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    // Dominio Físico
    const physicalPercentage = (cervantesResults.menopausiaySalud / 20) * 100;
    if (physicalPercentage <= 25) {
      recommendations.push({
        area: 'Físico',
        actions: [
          'Mantén una rutina de ejercicio ligero (caminatas, yoga, pilates)',
          'Continúa con una alimentación equilibrada, rica en fibra y calcio',
          'Realiza chequeos médicos periódicos',
          'Mantén una buena hidratación y calidad del sueño'
        ]
      });
    } else if (physicalPercentage <= 50) {
      recommendations.push({
        area: 'Físico',
        actions: [
          'Incorpora alimentos con fitoestrógenos (tofu, linaza, semillas de sésamo)',
          'Evita el alcohol, cafeína y comidas picantes, especialmente de noche',
          'Haz actividad física 3 veces por semana (cardio suave o fuerza moderada)',
          'Establece una rutina de sueño (hora fija para acostarte, evitar pantallas)'
        ]
      });
    } else {
      recommendations.push({
        area: 'Físico',
        actions: [
          'Consulta médica para evaluar opciones como THM o suplementos naturales',
          'Acompaña con apoyo nutricional especializado en menopausia',
          'Prueba técnicas de respiración para regular los sofocos',
          'Aumenta la frecuencia del ejercicio suave y de impacto bajo',
          'Incorpora baños tibios o duchas alternadas para regular temperatura'
        ]
      });
    }

    // Dominio Psíquico
    const psychPercentage = (cervantesResults.psiquico / 20) * 100;
    if (psychPercentage <= 25) {
      recommendations.push({
        area: 'Psíquico',
        actions: [
          'Continúa con prácticas de autocuidado y tiempo personal',
          'Integra momentos de disfrute y conexión en tu rutina',
          'Practica gratitud diaria y hábitos de presencia (mindfulness)'
        ]
      });
    } else if (psychPercentage <= 50) {
      recommendations.push({
        area: 'Psíquico',
        actions: [
          'Inicia prácticas de mindfulness (meditación guiada 5-10 minutos)',
          'Usa un diario emocional para canalizar tus pensamientos',
          'Mantén una red de apoyo activa (amistades, grupos, comunidad)',
          'Realiza actividades placenteras, aunque sean breves, cada día'
        ]
      });
    } else {
      recommendations.push({
        area: 'Psíquico',
        actions: [
          'Agenda sesiones con terapeuta especializado en menopausia',
          'Considera grupos de apoyo o círculos de mujeres',
          'Crea una rutina con momentos de autocuidado estructurados',
          'Integra visualizaciones, journaling y movimientos conscientes'
        ]
      });
    }

    // Dominio Sexualidad
    const sexualityPercentage = (cervantesResults.sexualidad / 16) * 100;
    if (sexualityPercentage <= 25) {
      recommendations.push({
        area: 'Sexualidad',
        actions: [
          'Sigue explorando tu sexualidad a tu ritmo',
          'Mantén la comunicación con tu pareja sobre deseos y necesidades',
          'Practica ejercicios de suelo pélvico para mantener la tonicidad'
        ]
      });
    } else if (sexualityPercentage <= 50) {
      recommendations.push({
        area: 'Sexualidad',
        actions: [
          'Usa lubricantes naturales para mejorar el confort',
          'Prueba ejercicios como Kegel para fortalecer el suelo pélvico',
          'Escucha podcasts o lee sobre sexualidad en la menopausia',
          'Estimula el autoconocimiento corporal con prácticas suaves'
        ]
      });
    } else {
      recommendations.push({
        area: 'Sexualidad',
        actions: [
          'Agenda una consulta con una sexóloga o ginecóloga especializada',
          'Considera tratamientos no hormonales para sequedad vaginal',
          'Introduce dispositivos de autoexploración sin presión',
          'Trabaja en recuperar el vínculo con el cuerpo sin exigencias'
        ]
      });
    }

    // Dominio Pareja
    const relationshipPercentage = (cervantesResults.relacionPareja / 12) * 100;
    if (relationshipPercentage <= 25) {
      recommendations.push({
        area: 'Pareja',
        actions: [
          'Realicen actividades nuevas juntos regularmente',
          'Mantén espacios de conversación emocional abierta',
          'Practiquen el elogio y reconocimiento mutuo'
        ]
      });
    } else if (relationshipPercentage <= 50) {
      recommendations.push({
        area: 'Pareja',
        actions: [
          'Propongan una "cita semanal" con foco en conexión (sin pantallas)',
          'Usen juegos o dinámicas de pareja para reactivar la intimidad emocional',
          'Practiquen ejercicios de escucha activa y validación mutua'
        ]
      });
    } else {
      recommendations.push({
        area: 'Pareja',
        actions: [
          'Consideren sesiones de terapia de pareja con foco en menopausia',
          'Reconstruyan la confianza con rutinas diarias de conexión',
          'Hablen desde lo que sienten sin juzgar ni interpretar al otro',
          'Exploren prácticas de reconexión emocional'
        ]
      });
    }

    return recommendations;
  };

  const qualityOfLife = getQualityOfLifeLevel(cervantesResults.total);
  const menopausiaLevel = getDomainLevel(cervantesResults.menopausiaySalud, 20);
  const psiquicoLevel = getDomainLevel(cervantesResults.psiquico, 20);
  const sexualidadLevel = getDomainLevel(cervantesResults.sexualidad, 16);
  const parejaLevel = getDomainLevel(cervantesResults.relacionPareja, 12);

  // Calculate number of areas with severe or significant impact
  const areasOfConcern = [
    { name: 'Físico', level: menopausiaLevel.level },
    { name: 'Psíquico', level: psiquicoLevel.level },
    { name: 'Sexualidad', level: sexualidadLevel.level },
    { name: 'Pareja', level: parejaLevel.level }
  ].filter(area => area.level === 'Severo' || area.level === 'Significativo');

  // Get all recommendations for areas of concern
  const recommendations = getRecommendations();
  const totalRecommendations = recommendations
    .filter(rec => areasOfConcern.some(area => area.name === rec.area))
    .reduce((total, rec) => total + rec.actions.length, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <p className="font-semibold text-gray-800">{data.dimension}</p>
          <p className="text-purple-600">
            Puntuación: {data.raw}/{data.maxScore}
          </p>
          <p className="text-gray-600">
            {Math.round(data.value)}% del máximo
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico Radar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Perfil de Bienestar</h3>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid gridType="circle" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: '#4B5563', fontSize: 12 }}
                  axisLine={{ strokeWidth: 2 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#4B5563' }}
                />
                <Radar
                  name="Puntuación"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  dot
                  activeDot={{ r: 8 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Haz clic en cada punto para ver los detalles
          </div>
        </div>

        {/* Calidad de Vida Global */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Calidad de Vida Global</h3>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Dominio Físico:</span>
              <div className="flex items-center">
                <span className="mr-2">{cervantesResults.menopausiaySalud}/20</span>
                <span className={`px-2 py-1 text-xs rounded-full ${menopausiaLevel.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  {menopausiaLevel.level}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(cervantesResults.menopausiaySalud / 20) * 100}%` }} 
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Dominio Psíquico:</span>
              <div className="flex items-center">
                <span className="mr-2">{cervantesResults.psiquico}/20</span>
                <span className={`px-2 py-1 text-xs rounded-full ${psiquicoLevel.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  {psiquicoLevel.level}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(cervantesResults.psiquico / 20) * 100}%` }} 
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Dominio Sexualidad:</span>
              <div className="flex items-center">
                <span className="mr-2">{cervantesResults.sexualidad}/16</span>
                <span className={`px-2 py-1 text-xs rounded-full ${sexualidadLevel.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  {sexualidadLevel.level}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(cervantesResults.sexualidad / 16) * 100}%` }} 
              />
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Dominio Pareja:</span>
              <div className="flex items-center">
                <span className="mr-2">{cervantesResults.relacionPareja}/12</span>
                <span className={`px-2 py-1 text-xs rounded-full ${parejaLevel.color.replace('text-', 'bg-').replace('600', '100')}`}>
                  {parejaLevel.level}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(cervantesResults.relacionPareja / 12) * 100}%` }} 
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Puntuación Global:</span>
                <div className="flex items-center">
                  <span className="mr-2 font-semibold">{cervantesResults.total}/68</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${qualityOfLife.color.replace('text-', 'bg-').replace('600', '100')}`}>
                    {qualityOfLife.level}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`${qualityOfLife.bgColor} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${(cervantesResults.total / 68) * 100}%` }} 
                />
              </div>
              
              <div className="mt-4 bg-blue-50 p-3 rounded-lg flex items-start">
                <Info size={18} className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Una mayor puntuación global implica mayor impacto de los síntomas de la menopausia y, por tanto, una peor calidad de vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan de Acción Personalizado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Plan de Acción Personalizado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">{rec.area}</h4>
              <ul className="space-y-2">
                {rec.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Planes Maia */}
      <PricingPlans />

      {/* Próximas Acciones */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Próximas Acciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <Target className="text-green-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold">Próxima Evaluación</h4>
              <p className="text-sm text-gray-600">En 30 días</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="text-blue-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold">Objetivos Activos</h4>
              <p className="text-sm text-gray-600">{totalRecommendations} recomendaciones</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="text-yellow-600 mr-3" size={24} />
            <div>
              <h4 className="font-semibold">Áreas de Atención</h4>
              <p className="text-sm text-gray-600">{areasOfConcern.length} identificadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;