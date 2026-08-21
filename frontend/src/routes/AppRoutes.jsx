import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages Import
import Login from '../pages/Login';
import Signup from '../pages/Signup';
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
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Login onLogin={onLogin} />
        }
      />
      <Route
        path="/signup"
        element={
          token ? <Navigate to="/dashboard" replace /> : <Signup />
        }
      />

      {/* Protected Layout & Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute token={token}>
            <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans flex">
              <Sidebar onLogout={onLogout} />
              <div className="flex-1 flex flex-col min-h-screen">
                <Navbar user={user} onLogout={onLogout} />
                <main className="p-6 max-w-7xl w-full mx-auto flex-1">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/scanner" element={<Scanner token={token} />} />
                    <Route path="/database" element={<Database token={token} />} />
                    
                    {/* Default Route Redirect */}
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