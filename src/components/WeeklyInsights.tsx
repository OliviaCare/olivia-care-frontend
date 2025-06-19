import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Insight {
  symptom: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
  recommendation: string;
}

interface WeeklyInsightsProps {
  insights: Insight[];
}

const WeeklyInsights: React.FC<WeeklyInsightsProps> = ({ insights }) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-red-500" />;
      case 'down':
        return <TrendingDown className="text-green-500" />;
      default:
        return <Minus className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Insights Semanales</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{insight.symptom}</span>
              <div className="flex items-center">
                {getTrendIcon(insight.trend)}
                <span className={`ml-2 ${
                  insight.trend === 'up' ? 'text-red-500' :
                  insight.trend === 'down' ? 'text-green-500' :
                  'text-gray-500'
                }`}>
                  {insight.percentage}%
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{insight.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyInsights;