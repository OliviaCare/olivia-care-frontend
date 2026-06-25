import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Lock, Mail, Calendar, LogOut, CreditCard, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { updateUserProfile, updateUserPassword } from '../services/userService';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    profilePicture: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (currentUser && userData) {
      setFormData({
        name: userData.name || currentUser.displayName || '',
        email: userData.email || currentUser.email || '',
        dateOfBirth: userData.dateOfBirth || '',
        profilePicture: userData.profilePicture || 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [currentUser, userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (currentUser) {
        await updateUserProfile(currentUser.uid, {
          name: formData.name,
          dateOfBirth: formData.dateOfBirth,
          profilePicture: formData.profilePicture,
        });

        if (formData.newPassword) {
          if (formData.newPassword !== formData.confirmPassword) {
            throw new Error('Las contraseñas nuevas no coinciden');
          }
          if (!formData.currentPassword) {
            throw new Error('Debes proporcionar tu contraseña actual');
          }
          await updateUserPassword(currentUser, formData.currentPassword, formData.newPassword);
        }

        setSuccess('Perfil actualizado correctamente');
        setIsEditing(false);
        
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err: any) {
      setError('Error al cerrar sesión: ' + err.message);
    }
  };

  if (!currentUser || !userData) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800">Tu Perfil</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          >
            <LogOut size={20} className="mr-2" />
            Cerrar Sesión
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
            {success}
          </div>
        )}
        
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            {isEditing && (
              <label htmlFor="profilePicture" className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer">
                <Camera size={16} />
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </label>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-semibold">{formData.name}</h2>
            <p className="text-gray-600">{formData.email}</p>
          </div>
        </div>

        <div className="mb-8 border-t border-gray-200 pt-8 mt-8">
          <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
            <CreditCard className="mr-2" size={24} />
            Información de Suscripción
          </h2>

          {userData?.subscription ? (
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Estado de la suscripción:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    userData.subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                    userData.subscription.status === 'trial' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {userData.subscription.status === 'active' ? 'Activa' :
                     userData.subscription.status === 'trial' ? 'Período de prueba' :
                     'Inactiva'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Plan:</span>
                    <span className="ml-2 font-medium">
                      {userData.subscription.plan === 'premium' ? 'Premium' : 'Gratuito'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fecha de inicio:</span>
                    <span className="ml-2 font-medium">
                      {userData.subscription.startDate.toLocaleDateString()}
                    </span>
                  </div>
                  {userData.subscription.nextBillingDate && (
                    <div>
                      <span className="text-gray-600">Próximo cobro:</span>
                      <span className="ml-2 font-medium">
                        {userData.subscription.nextBillingDate.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {userData.subscription.trialEndsAt && (
                    <div>
                      <span className="text-gray-600">Fin del período de prueba:</span>
                      <span className="ml-2 font-medium">
                        {userData.subscription.trialEndsAt.toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {userData.subscription.paymentMethod && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Método de pago:</span>
                      <span className="text-sm">
                        {userData.subscription.paymentMethod.type === 'card' ? (
                          <span>
                            Tarjeta terminada en {userData.subscription.paymentMethod.last4}
                            {userData.subscription.paymentMethod.expiryDate && 
                              ` (Expira: ${userData.subscription.paymentMethod.expiryDate})`}
                          </span>
                        ) : 'PayPal'}
                      </span>
                    </div>
                  </div>
                )}

                {userData.subscription.status === 'trial' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start">
                      <Info className="text-yellow-600 mr-2 mt-1" size={20} />
                      <div className="text-sm text-yellow-800">
                        <p className="mb-2">
                          El período de prueba gratis es de 7 días con Maia. Para continuar disfrutando de todos los beneficios y funcionalidades premium de Maia sin interrupciones, es necesario actualizar a la suscripción completa por solo 9€.
                        </p>
                        <p>
                          ¿Necesita ayuda? Nuestro equipo de soporte está disponible 24/7:{' '}
                          <a 
                            href="https://wa.me/+34692032728"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-800 flex items-center inline-flex"
                          >
                            Contactar Soporte
                            <ExternalLink size={14} className="ml-1" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {userData.subscription.status === 'active' && (
                <button
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                  onClick={() => {/* Implement cancel subscription logic */}}
                >
                  Cancelar suscripción
                </button>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-gray-600 mb-4">No tienes una suscripción activa</p>
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => navigate('/pricing')}
              >
                Ver planes disponibles
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <User size={16} className="inline mr-2" />
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <Mail size={16} className="inline mr-2" />
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                className="w-full p-2 border rounded bg-gray-50"
                disabled
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                <Calendar size={16} className="inline mr-2" />
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {isEditing && (
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    <Lock size={16} className="inline mr-2" />
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    minLength={6}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;