import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DomainScore {
  domain: string;
  score: number;
  maxScore: number;
  interpretation: string;
}

interface CervantesResultsProps {
  scores: {
    menopausiaySalud: number;
    psiquico: number;
    sexualidad: number;
    relacionPareja: number;
    total: number;
  };
}

const CervantesResults: React.FC<CervantesResultsProps> = ({ scores }) => {
  const domainScores: DomainScore[] = [
    {
      domain: "Menopausia y Salud",
      score: scores.menopausiaySalud,
      maxScore: 20,
      interpretation: interpretScore(scores.menopausiaySalud, 20)
    },
    {
      domain: "Psíquico",
      score: scores.psiquico,
      maxScore: 20,
      interpretation: interpretScore(scores.psiquico, 20)
    },
    {
      domain: "Sexualidad",
      score: scores.sexualidad,
      maxScore: 16,
      interpretation: interpretScore(scores.sexualidad, 16)
    },
    {
      domain: "Relación de Pareja",
      score: scores.relacionPareja,
      maxScore: 12,
      interpretation: interpretScore(scores.relacionPareja, 12)
    }
  ];

  const chartData = domainScores.map(domain => ({
    name: domain.domain,
    score: (domain.score / domain.maxScore) * 100,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Resultados de tu Evaluación</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Puntuación por Dominios</h3>
        <div className="h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8b5cf6" 
                name="Porcentaje" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {domainScores.map((domain, index) => (
            <div key={index} className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{domain.domain}</h4>
              <div className="flex justify-between mb-2">
                <span>Puntuación:</span>
                <span className="font-semibold">{domain.score}/{domain.maxScore}</span>
              </div>
              <p className="text-sm text-gray-600">{domain.interpretation}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-6 bg-purple-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Recomendaciones Personalizadas</h3>
        <ul className="space-y-3">
          {generateRecommendations(scores)}
        </ul>
      </div>
    </div>
  );
};

function interpretScore(score: number, maxScore: number): string {
  const percentage = (score / maxScore) * 100;
  if (percentage < 25) return "Impacto leve";
  if (percentage < 50) return "Impacto moderado";
  if (percentage < 75) return "Impacto significativo";
  return "Impacto severo";
}

function generateRecommendations(scores: CervantesResultsProps['scores']): string[] {
  const recommendations: string[] = [];

  if (scores.menopausiaySalud > 10) {
    recommendations.push("Considera consultar con un especialista sobre terapias hormonales y alternativas naturales.");
  }

  if (scores.psiquico > 10) {
    recommendations.push("Te beneficiarías de técnicas de manejo del estrés y mindfulness.");
  }

  if (scores.sexualidad > 8) {
    recommendations.push("Consulta con un especialista sobre opciones para mejorar tu salud íntima.");
  }

  if (scores.relacionPareja > 6) {
    recommendations.push("Considera la terapia de pareja para mejorar la comunicación y conexión.");
  }

  return recommendations;
}

export default CervantesResults;