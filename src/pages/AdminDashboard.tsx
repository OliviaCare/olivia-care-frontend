import React, { useState } from 'react';
import { Shield, Trash2, AlertTriangle } from 'lucide-react';
import { cleanupUsers } from '../utils/adminUtils';

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCleanup = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar todos los usuarios? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await cleanupUsers();
      setSuccess('Base de datos limpiada exitosamente');
    } catch (err) {
      setError('Error al limpiar la base de datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <Shield className="text-purple-600 mr-2" size={24} />
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Mantenimiento de Base de Datos</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-600 mr-2 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800">Advertencia</h3>
                <p className="text-sm text-yellow-700">
                  Esta acción eliminará permanentemente todos los datos de usuarios.
                  Asegúrate de tener un respaldo antes de proceder.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleCleanup}
            disabled={loading}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <Trash2 size={20} className="mr-2" />
                Limpiar Base de Datos
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 bg-green-50 text-green-600 p-4 rounded-lg">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;