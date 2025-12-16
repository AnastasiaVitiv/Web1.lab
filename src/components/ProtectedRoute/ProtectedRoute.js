import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const userEmail = localStorage.getItem('userEmail');
        return userEmail && userEmail.trim() !== '';
    };

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;