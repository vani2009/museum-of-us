import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Museum Gallery Error Boundary:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn("Storage clear failed:", e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-[#FFF0F3] flex flex-col items-center justify-center p-6 text-center font-sans select-none">
          <div className="max-w-md bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-2xl space-y-5">
            <div className="text-4xl">🎂✨</div>
            <h1 className="text-2xl font-cinzel font-bold text-[#5A2A38]">
              The Grand Museum of Us
            </h1>
            <p className="text-sm text-[#5A2A38]/80 font-serif leading-relaxed">
              We encountered a slight hiccup loading the 3D gallery. Click below to refresh with the latest updates!
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3.5 bg-gradient-to-r from-[#FFB6C1] to-[#E8A598] text-[#5A2A38] font-cinzel font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Refresh & Enter Gallery 🌸
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
