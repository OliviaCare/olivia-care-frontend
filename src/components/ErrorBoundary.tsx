import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Captura errores de render/efectos para que la app nunca muestre una pantalla
 * en blanco. En su lugar muestra un mensaje con un botón para volver al inicio.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error('ErrorBoundary capturó un error:', error, info);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-2xl font-bold text-olivia-primary mb-3">Algo salió mal</h1>
          <p className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado. Por favor, vuelve a intentarlo.
          </p>
          <button
            onClick={this.handleReload}
            className="bg-olivia-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300"
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
