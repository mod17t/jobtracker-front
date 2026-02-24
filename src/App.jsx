import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./components/pages/login";
import Register from "./components/pages/Register";
import { Dashboard } from "./components/pages/Dashboard";
import { Applications } from "./components/pages/Applications";
import { AddApplication } from "./components/pages/AddApplication";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Chargement....</p>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/applications"
            element={
              <PrivateRoute>
                <Applications />
              </PrivateRoute>
            }
          />

          <Route
            path="/applications/new"
            element={
              <PrivateRoute>
                <AddApplication />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
