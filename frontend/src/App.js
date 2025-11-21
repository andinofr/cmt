import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import Login from './pages/Login';
import WorkspaceSelector from './pages/WorkspaceSelector';
import PlanningWorkspace from './pages/PlanningWorkspace';
import ExecutionWorkspace from './pages/ExecutionWorkspace';
import CentralHub from './pages/CentralHub';

// Protected Route Component
const ProtectedRoute = ({ children, requireCMT = false }) => {
  const { user, isLoading, isCMTTeam } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#007d79] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireCMT && !isCMTTeam) {
    return <Navigate to="/workspace-selector" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/workspace-selector"
        element={
          <ProtectedRoute>
            <WorkspaceSelector />
          </ProtectedRoute>
        }
      />
      <Route
        path="/planning"
        element={
          <ProtectedRoute>
            <PlanningWorkspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/execution"
        element={
          <ProtectedRoute>
            <ExecutionWorkspace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/central-hub"
        element={
          <ProtectedRoute requireCMT={true}>
            <CentralHub />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
