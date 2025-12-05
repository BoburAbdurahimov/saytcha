// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SubjectSelectionPage from "./pages/SubjectSelectionPage";
import TestPage from "./pages/TestPage";
import AdminPage from "./pages/AdminPage";
import useStore from "./store";
import { translations } from "./i18n/translations";

// Header component
const Header = () => {
  const { selectedSubjects, formData, language, setLanguage } = useStore();
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <header className="bg-blue-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">{t.appName}</h1>
              <p className="text-sm text-gray-600">{t.appDescription}</p>
            </div>
          </Link>

          <nav className="flex gap-4 items-center">
            {/* Language Switcher */}
            <div className="flex gap-1 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${language === 'uz'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${language === 'ru'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                RU
              </button>
            </div>

            <Link
              to="/"
              className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-blue-700 no-underline"
            >
              {t.navRegistration}
            </Link>

            {formData.first_name && (
              <Link
                to="/subjects"
                className="px-4 py-2 rounded-lg hover:bg-blue-100 font-medium text-blue-700 no-underline"
              >
                {t.navSubjects}
                {selectedSubjects.length > 1 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {selectedSubjects.length}/3
                  </span>
                )}
              </Link>
            )}

            {selectedSubjects.length === 3 && (
              <Link
                to="/test"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium no-underline"
              >
                {t.navStartTest}
              </Link>
            )}

            <Link
              to="/admin"
              className="px-4 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-600 no-underline text-sm"
              title="Admin panel"
            >
              <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Protected Route component
const ProtectedRoute = ({ children, condition }) => {
  const { formData, selectedSubjects } = useStore();

  if (condition === "requiresRegistration" && !formData.first_name) {
    return <Navigate to="/" replace />;
  }

  if (condition === "requiresSubjects") {
    if (!formData.first_name) {
      return <Navigate to="/" replace />;
    }
    if (selectedSubjects.length !== 3) {
      return <Navigate to="/subjects" replace />;
    }
  }

  return children;
};

// Main App component
const AppContent = () => {
  const { language } = useStore();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<RegistrationPage />} />

          <Route
            path="/subjects"
            element={
              <ProtectedRoute condition="requiresRegistration">
                <SubjectSelectionPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test"
            element={
              <ProtectedRoute condition="requiresSubjects">
                <TestPage />
              </ProtectedRoute>
            }
          />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>{t.footerCopyright}</p>
            <p className="text-sm mt-2">
              {t.footerDescription}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// App wrapper with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;