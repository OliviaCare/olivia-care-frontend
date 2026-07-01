import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WellnessDashboard from '../components/WellnessDashboard';
import AIAssistant from '../components/AIAssistant';

const Dashboard: React.FC = () => {
  const { userData, loading, refreshUserData } = useAuth();
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    const checkAssessmentResults = async () => {
      if (!loading && !userData?.assessmentResults && retryCount < 3) {
        console.log('No assessment results found, refreshing...', { retryCount });
        await refreshUserData();
        setRetryCount(prev => prev + 1);
      }
    };

    checkAssessmentResults();
  }, [userData, loading, refreshUserData, retryCount]);

  useEffect(() => {
    if (!loading && !userData?.assessmentResults && retryCount >= 3) {
      console.log('No assessment results after retries, redirecting...');
      navigate('/assessment', { replace: true });
    }
  }, [loading, userData, retryCount, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!userData?.assessmentResults) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Cargando resultados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-800">Tu Plan Personalizado</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={showAI ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <WellnessDashboard cervantesResults={userData.assessmentResults} />
        </div>
        {showAI && (
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;