import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import { AppLayout } from './ui/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { SearchMapPage } from './pages/SearchMapPage';
import { BookingPage } from './pages/BookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { UserDashboard } from './pages/UserDashboard';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageSlotsPage } from './pages/admin/ManageSlotsPage';
import { ManageBookingsPage } from './pages/admin/ManageBookingsPage';
import { ManageUsersPage } from './pages/admin/ManageUsersPage';
import { ProtectedRoute } from './ui/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'search', element: <SearchMapPage /> },
      { path: 'booking/:locationId/:slotId', element: (
        <ProtectedRoute>
          <BookingPage />
        </ProtectedRoute>
      ) },
      { path: 'payment/:bookingId', element: (
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      ) },
      { path: 'confirmation/:bookingId', element: (
        <ProtectedRoute>
          <ConfirmationPage />
        </ProtectedRoute>
      ) },
      { path: 'dashboard', element: (
        <ProtectedRoute roles={['user']}>
          <UserDashboard />
        </ProtectedRoute>
      ) },
      { path: 'about', element: <div className="p-6">About Smart Parking</div> },
      { path: 'contact', element: <div className="p-6">Contact Us</div> },
      { path: 'admin/login', element: <AdminLoginPage /> },
      { path: 'admin', element: (
        <ProtectedRoute roles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      ) },
      { path: 'admin/slots', element: (
        <ProtectedRoute roles={['admin']}>
          <ManageSlotsPage />
        </ProtectedRoute>
      ) },
      { path: 'admin/bookings', element: (
        <ProtectedRoute roles={['admin']}>
          <ManageBookingsPage />
        </ProtectedRoute>
      ) },
      { path: 'admin/users', element: (
        <ProtectedRoute roles={['admin']}>
          <ManageUsersPage />
        </ProtectedRoute>
      ) },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
