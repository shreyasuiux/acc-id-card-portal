import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { useEffect, useState } from 'react';

// Custom event for auth state changes
export const AUTH_CHANGE_EVENT = 'auth-state-changed';

// Dispatch auth change event
export const dispatchAuthChange = (isAuthenticated?: boolean) => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

// Check if user is authenticated
const isAuthenticated = () => {
  try {
    const user = localStorage.getItem('user');
    return !!user && user !== 'null';
  } catch {
    return false;
  }
};

// Protected Route wrapper - checks auth on every render
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    // Re-check authentication on mount and when localStorage changes
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener(AUTH_CHANGE_EVENT, checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener(AUTH_CHANGE_EVENT, checkAuth);
    };
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Public Route wrapper - redirects to dashboard if authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  useEffect(() => {
    // Re-check authentication on mount
    const checkAuth = () => {
      setIsAuth(isAuthenticated());
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    window.addEventListener(AUTH_CHANGE_EVENT, checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener(AUTH_CHANGE_EVENT, checkAuth);
    };
  }, []);

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

// Root redirect component - ALWAYS redirect to login first
const RootRedirect = () => {
  // ALWAYS redirect to /login first, regardless of auth status
  return <Navigate to="/login" replace />;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);