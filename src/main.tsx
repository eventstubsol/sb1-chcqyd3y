import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { TenantProvider } from './contexts/TenantContext';
import { SystemProvider } from './contexts/SystemContext';
import { EventProvider } from './contexts/EventContext';
import { AdminProvider } from './contexts/AdminContext';
import { RegistrationProvider } from './contexts/RegistrationContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <AdminProvider>
          <SystemProvider>
            <TenantProvider>
              <EventProvider>
                <RegistrationProvider>
                  <App />
                </RegistrationProvider>
              </EventProvider>
            </TenantProvider>
          </SystemProvider>
        </AdminProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
);