import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { Role } from '../types';

export function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { firebaseUser, appUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!firebaseUser || !appUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(appUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
