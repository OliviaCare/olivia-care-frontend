import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SymptomData {
  date: string;
  intensity: number;
}

interface SymptomChartProps {
  data: SymptomData[];
  symptomName: string;
  color: string;
}

const SymptomChart: React.FC<SymptomChartProps> = ({ data, symptomName, color }) => {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'd MMM', { locale: es }),
  }));

  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{symptomName}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Intensidad"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SymptomChart;