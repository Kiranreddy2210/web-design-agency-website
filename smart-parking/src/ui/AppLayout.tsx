import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { clsx } from 'clsx';

export function AppLayout() {
  const { appUser, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-xl">SmartParking</Link>
          <nav className="flex items-center gap-4">
            <NavLink to="/search" className={({ isActive }) => clsx('text-sm', isActive && 'text-blue-600 font-medium')}>Find Parking</NavLink>
            <NavLink to="/about" className={({ isActive }) => clsx('text-sm', isActive && 'text-blue-600 font-medium')}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => clsx('text-sm', isActive && 'text-blue-600 font-medium')}>Contact</NavLink>
            {appUser ? (
              <div className="flex items-center gap-2">
                <NavLink to="/dashboard" className={({ isActive }) => clsx('text-sm', isActive && 'text-blue-600 font-medium')}>Dashboard</NavLink>
                {appUser.role === 'admin' && (
                  <NavLink to="/admin" className={({ isActive }) => clsx('text-sm', isActive && 'text-blue-600 font-medium')}>Admin</NavLink>
                )}
                <button onClick={logout} className="text-sm text-red-600">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink to="/login" className="text-sm">Login</NavLink>
                <NavLink to="/register" className="text-sm">Register</NavLink>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} SmartParking</footer>
    </div>
  );
}
