import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import OrganizerDashboard from './components/OrganizerDashboard';
import { SuperAdminDashboard } from './components/admin';
import LoadingSpinner from './components/shared/layouts/LoadingSpinner';
import FormBuilderPage from './components/form-builder/FormBuilderPage';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { SystemProvider } from './contexts/SystemContext';
import { TenantProvider } from './contexts/TenantContext';
import { EventProvider } from './contexts/EventContext';
import { RegistrationProvider } from './contexts/RegistrationContext';

// Separate component for protected content
function ProtectedApp() {
  const { user, loading, isImpersonating } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/forms/create" element={<FormBuilderPage />} />
        <Route 
          path="/*" 
          element={(() => {
            if (isImpersonating) {
              return <OrganizerDashboard />;
            }
            switch (user.role) {
              case 'admin':
                return <SuperAdminDashboard />;
              case 'organizer':
                return <OrganizerDashboard />;
              default:
                return <Navigate to="/events" />;
            }
          })()} 
        />
      </Routes>
    </Router>
  );
}

// Main App component with providers
export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AdminProvider>
          <SystemProvider>
            <TenantProvider>
              <EventProvider>
                <RegistrationProvider>
                  <ProtectedApp />
                </RegistrationProvider>
              </EventProvider>
            </TenantProvider>
          </SystemProvider>
        </AdminProvider>
      </AuthProvider>
    </ToastProvider>
  );
}