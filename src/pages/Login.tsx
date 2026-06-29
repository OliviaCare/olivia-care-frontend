import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertTriangle } from 'lucide-react';
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [mode, setMode] = useState<'login' | 'reset'>('login');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    // Check if user needs to verify email
    if (location.state?.needsVerification) {
      setError('Por favor, verifica tu correo electrónico antes de iniciar sesión');
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      if (!userCredential.user.emailVerified) {
        // Send a new verification email if needed
        await sendEmailVerification(userCredential.user);
        setVerificationSent(true);
        await auth.signOut();
        setError('Por favor, verifica tu correo electrónico antes de iniciar sesión');
        setLoading(false);
        return;
      }

      // If email is verified, proceed with login
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      let errorMessage = 'Error al iniciar sesión';
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Correo electrónico o contraseña incorrectos';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde';
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetSent(true);
    } catch (err: any) {
      let errorMessage = 'No se pudo enviar el correo de recuperación';
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico no válido';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos. Por favor, intenta más tarde';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await sendEmailVerification(currentUser);
        setVerificationSent(true);
      }
    } catch (err) {
      setError('Error al reenviar el correo de verificación');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          {mode === 'reset' ? 'Recuperar contraseña' : 'Iniciar Sesión'}
        </h2>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-2">
              <AlertTriangle className="text-red-600 mr-2" size={20} />
              <span className="text-red-600 font-semibold">Error</span>
            </div>
            <p className="text-red-600">{error}</p>
            {error.includes('verifica tu correo') && !verificationSent && (
              <button
                onClick={handleResendVerification}
                className="mt-2 text-purple-600 hover:text-purple-800 text-sm"
              >
                Reenviar correo de verificación
              </button>
            )}
            {verificationSent && (
              <p className="mt-2 text-green-600 text-sm">
                Correo de verificación enviado. Por favor, revisa tu bandeja de entrada.
              </p>
            )}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => { setMode('reset'); setError(''); setResetSent(false); }}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                ¿Olvidaste tu contraseña?
              </button>
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
                  <LogIn size={18} className="mr-2" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {resetSent ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm">
                Si existe una cuenta con ese correo, te hemos enviado un enlace para
                restablecer tu contraseña. Revisa tu bandeja de entrada (y la carpeta de spam).
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-sm">
                  Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : 'Enviar enlace de recuperación'}
                </button>
              </>
            )}
          </form>
        )}

        <div className="mt-6 text-center">
          {mode === 'reset' ? (
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setResetSent(false); }}
              className="text-purple-600 hover:text-purple-800"
            >
              Volver a iniciar sesión
            </button>
          ) : (
            <p className="text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/signup" className="text-purple-600 hover:text-purple-800">
                Regístrate aquí
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;