import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, AlertTriangle } from 'lucide-react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { createOrUpdateUser } from '../services/userService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value.trim()
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
    if (formData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (!formData.email.includes('@')) {
      throw new Error('Por favor, ingresa un correo electrónico válido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      validateForm();

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Create user document in Firestore
      await createOrUpdateUser(userCredential.user.uid, {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
        emailVerified: false
      });

      // Send verification email without custom action URL
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);

    } catch (err: any) {
      console.error('Signup error:', err);
      let errorMessage = 'Error al crear la cuenta';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está registrado';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet';
          break;
        case 'auth/unauthorized-continue-uri':
          errorMessage = 'Error al enviar el correo de verificación. Por favor, intenta nuevamente.';
          break;
        default:
          errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        alert('Correo de verificación reenviado. Por favor, revisa tu bandeja de entrada');
      }
    } catch (err) {
      setError('Error al reenviar el correo de verificación');
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <Mail className="mx-auto text-purple-600 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Verifica tu correo electrónico</h2>
          <p className="text-gray-600 mb-6">
            Hemos enviado un enlace de verificación a <strong>{formData.email}</strong>
          </p>
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <AlertTriangle className="mx-auto text-purple-600 mb-2" size={24} />
            <p className="text-sm text-purple-800">
              Por favor, verifica tu correo electrónico antes de continuar.
              Revisa también tu carpeta de spam.
            </p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Ir a Iniciar Sesión
            </button>
            <button
              onClick={handleResendVerification}
              className="text-purple-600 hover:text-purple-800"
            >
              Reenviar correo de verificación
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Crear Cuenta</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <User size={16} className="inline mr-2" />
              Nombre Completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Mail size={16} className="inline mr-2" />
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Lock size={16} className="inline mr-2" />
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              <Lock size={16} className="inline mr-2" />
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
            ) : (
              <>
                <UserPlus size={18} className="mr-2" />
                Registrarse
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-800">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;