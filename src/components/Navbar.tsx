import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Timer, Home, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">ActivityTracker</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <Timer className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Welcome, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};