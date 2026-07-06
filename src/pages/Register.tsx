import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CreditCard, Shield, Lock, User, Check, Mail, AlertTriangle, ArrowLeft, ArrowRight, Calendar, CreditCard as CardIcon, SignalLow as PaypalLogo, Apple as AppleLogo } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../services/userService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../lib/firebase';
import RegisterLanding from '../components/RegisterLanding';

interface LocationState {
  assessmentCompleted?: boolean;
  answers?: { [key: number]: number };
  results?: any;
  paymentPending?: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, refreshUserData } = useAuth();
  const state = location.state as LocationState;
  const [isLogin, setIsLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentForm] = useState(false); // Set to false to hide payment step
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'card',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('Register state:', state);
    if (!state?.assessmentCompleted || !state?.results) {
      console.log('Redirecting to assessment due to missing data');
      navigate('/assessment', { replace: true });
      return;
    }

    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        email: currentUser.email || '',
        name: currentUser.displayName || '',
      }));
    }
  }, [state, currentUser, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (!formData.email || !formData.name || !formData.phone || !formData.password) {
        setError('Por favor completa todos los campos requeridos');
        return;
      }

      setError('');
      // Skip to final step since payment is hidden
      handleAuth(e);
      return;
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    setError('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      let userCredential;
      
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
      } else {
        try {
          userCredential = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          
          await sendEmailVerification(userCredential.user);
        } catch (authError: any) {
          if (authError.code === 'auth/email-already-in-use') {
            setIsLogin(true);
            setError('Este correo ya está registrado. Por favor, inicia sesión.');
            setLoading(false);
            return;
          }
          throw authError;
        }
      }

      await handlePaymentAndProfile(userCredential.user.uid);
      
    } catch (error: any) {
      console.error('Auth error:', error);
      let errorMessage = 'Error en la autenticación';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Correo electrónico o contraseña incorrectos';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo electrónico ya está registrado';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handlePaymentAndProfile = async (userId: string) => {
    try {
      const phoneNumber = '+34' + formData.phone.replace(/\D/g, '');

      await updateUserProfile(userId, {
        name: formData.name,
        assessmentResults: state.results,
        profile: {
          phoneNumber,
          completionStatus: 'COMPLETED',
          onboardingStep: 'PAYMENT_COMPLETED',
          paymentStatus: 'ACTIVE'
        }
      });

      await refreshUserData();
      setSuccess('Registro completado exitosamente');
      
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (error: any) {
      setError(error.message || 'Error al procesar el registro');
      setLoading(false);
    }
  };

  if (!state?.assessmentCompleted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Redirigiendo al assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {/* Header and progress section */}
        <div className="mb-8">
          {isLogin ? (
            <h2 className="text-2xl font-bold text-purple-800">Inicia sesión</h2>
          ) : (
            <div className="text-center">
              <span className="inline-flex items-center gap-1 text-green-600 font-medium text-sm mb-2">
                <Check size={16} /> Evaluación completada
              </span>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">
                Tus resultados están listos
              </h2>
              <p className="text-gray-600">
                Crea tu cuenta gratis para entender el impacto de los síntomas y obtener un plan personalizado.
              </p>
            </div>
          )}
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column: Plan benefits */}
          <div className="md:w-2/5 order-2 md:order-1">
            <div className="bg-purple-50 p-6 rounded-lg mb-8 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Al crear tu cuenta desbloqueas:</h3>
              <ul className="space-y-3">
                <BenefitItem text="Tus resultados detallados de la Escala Cervantes" highlight />
                <BenefitItem text="Plan personalizado según tus síntomas" />
                <BenefitItem text="Recursos educativos exclusivos" />
              </ul>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-amber-800">
                  Tu evaluación se guarda solo al crear tu cuenta. Si sales ahora, tendrás que repetir el test.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-200">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2">
                    <span className="text-gray-500 line-through text-lg">5€/mes</span>
                    <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Gratis para empezar
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sin tarjeta · Acceso inmediato
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Form */}
          <div className="md:w-3/5 order-1 md:order-2">
            {isLogin ? (
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : 'Iniciar sesión'}
                </button>
              </form>
            ) : (
              <>
                {currentStep === 1 ? (
                  <form onSubmit={handleNextStep} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Nombre completo <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Correo electrónico <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Teléfono <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 border border-r-0 rounded-l bg-gray-50 text-gray-600 select-none">
                            +34
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="600 000 000"
                            className="w-full p-2 border rounded-r focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Contraseña <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                            minLength={6}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                    >
                      Ver mis resultados
                    </button>
                    <p className="text-xs text-center text-gray-500">
                      Gratis · Sin tarjeta · Acceso inmediato
                    </p>
                  </form>
                ) : (
                  showPaymentForm && (
                    <form onSubmit={handleAuth} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold flex items-center text-lg">
                          <CreditCard className="mr-2" size={20} />
                          Información de pago
                        </h3>

                        {/* Payment methods */}
                        <div className="mb-6">
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Método de pago
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => handlePaymentMethodChange('card')}
                              className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                                formData.paymentMethod === 'card'
                                  ? 'border-purple-600 bg-purple-50'
                                  : 'border-gray-300 hover:border-purple-300'
                              }`}
                            >
                              <CardIcon size={24} className={formData.paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-500'} />
                              <span className="text-sm mt-1">Tarjeta</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePaymentMethodChange('paypal')}
                              className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                                formData.paymentMethod === 'paypal'
                                  ? 'border-purple-600 bg-purple-50'
                                  : 'border-gray-300 hover:border-purple-300'
                              }`}
                            >
                              <PaypalLogo size={24} className={formData.paymentMethod === 'paypal' ? 'text-purple-600' : 'text-gray-500'} />
                              <span className="text-sm mt-1">PayPal</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handlePaymentMethodChange('apple')}
                              className={`p-3 border rounded-lg flex flex-col items-center justify-center transition-colors ${
                                formData.paymentMethod === 'apple'
                                  ? 'border-purple-600 bg-purple-50'
                                  : 'border-gray-300 hover:border-purple-300'
                              }`}
                            >
                              <AppleLogo size={24} className={formData.paymentMethod === 'apple' ? 'text-purple-600' : 'text-gray-500'} />
                              <span className="text-sm mt-1">Apple Pay</span>
                            </button>
                          </div>
                        </div>

                        {formData.paymentMethod === 'card' && (
                          <>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Nombre en la tarjeta
                              </label>
                              <input
                                type="text"
                                name="cardholderName"
                                value={formData.cardholderName}
                                onChange={handleInputChange}
                                placeholder="Nombre completo"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 text-sm font-medium mb-1">
                                Número de tarjeta
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                                maxLength={19}
                                pattern="\d*"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  Fecha de expiración
                                </label>
                                <input
                                  type="text"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange}
                                  placeholder="MM/AA"
                                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  required
                                  maxLength={5}
                                />
                              </div>
                              <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1">
                                  CVV
                                </label>
                                <input
                                  type="password"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  placeholder="123"
                                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                  required
                                  maxLength={4}
                                  pattern="\d*"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {formData.paymentMethod === 'paypal' && (
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <p className="text-blue-800">
                              Serás redirigido a PayPal para completar el pago de forma segura.
                            </p>
                          </div>
                        )}

                        {formData.paymentMethod === 'apple' && (
                          <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <p className="text-gray-800">
                              Serás redirigido a Apple Pay para completar el pago de forma segura.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Shield className="text-purple-600 mr-2" size={20} />
                          <span className="font-semibold">Pago seguro</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Tu información está protegida con encriptación de grado bancario
                        </p>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex items-center justify-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <ArrowLeft size={18} className="mr-2" />
                          Volver
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                        >
                          {loading ? (
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                          ) : 'Completar registro y acceder a mi plan'}
                        </button>
                      </div>
                    </form>
                  )
                )}
              </>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setCurrentStep(1);
                }}
                className="text-purple-600 hover:text-purple-800"
              >
                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <RegisterLanding />
    </div>
  );
};

const BenefitItem: React.FC<{ text: string; highlight?: boolean }> = ({ text, highlight }) => (
  <li className="flex items-center">
    <Check className="text-green-500 mr-2 flex-shrink-0" size={20} />
    <span className={highlight ? 'font-semibold text-purple-800' : ''}>{text}</span>
  </li>
);

export default Register;