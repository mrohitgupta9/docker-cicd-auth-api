import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import Login from '../pages/Login';
import Register from '../pages/Register'; // Direct Register component import
import Dashboard from '../pages/Dashboard';
import Scanner from '../pages/Scanner';
import Database from '../pages/Database';

// Layout Components
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

// Protected Route Wrapper Component
const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function AppRoutes({ token, user, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Root Base Path Redirect */}
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Login onLogin={onLogin} />
        }
      />
      
      {/* Supporting Both /register and /signup paths for seamless navigation */}
      <Route
        path="/register"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />
      <Route
        path="/signup"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      {/* Protected Layout & Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute token={token}>
            <div className="min-h-screen bg-[#0A0E17] text-slate-100 font-sans flex">
              <Sidebar onLogout={onLogout} />
              <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <Navbar user={user} onLogout={onLogout} />
                <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/scanner" element={<Scanner token={token} />} />
                    <Route path="/database" element={<Database token={token} />} />
                    
                    {/* Catch-all Fallback for authenticated nested routes */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}