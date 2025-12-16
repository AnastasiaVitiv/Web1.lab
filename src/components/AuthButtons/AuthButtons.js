import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthButtons.css";

function AuthButtons({ isAuthenticated, setIsAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userUsername');
        localStorage.removeItem('currentCart');
        
        setIsAuthenticated(false);
        navigate('/login');
    };

    if (isAuthenticated) {
        return (
            <div className="auth-buttons">
                <button onClick={handleLogout} className="logout-button">
                    Sign me out
                </button>
            </div>
        );
    }

    return (
        <div className="auth-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}

export default AuthButtons;