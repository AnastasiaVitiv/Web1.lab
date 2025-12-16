import React from "react";
import { Link } from "react-router-dom";
import { shipsApi } from "../../api/shipsApi"; 
import "./Navigation.css";

function Navigation({ isAuthenticated }) {
    const logNavigation = async (pageName) => {
        try {
            await shipsApi.logAction('log/navigation', { page: pageName });
            console.log(`Navigation to ${pageName} logged`);
        } catch (error) {
            console.error('Error logging navigation:', error);
        }
    };

    const handleNavigationClick = (pageName) => {
        logNavigation(pageName);
    };

    return (
        <nav className="nav">
            {isAuthenticated ? (
                <>
                    <Link to="/" onClick={() => handleNavigationClick('home')}>Home</Link>
                    <Link to="/catalog" onClick={() => handleNavigationClick('catalog')}>Catalog</Link>
                    <Link to="/cart" onClick={() => handleNavigationClick('cart')}>Cart</Link>
                </>
            ) : (
                <>
                    <Link to="/login" onClick={() => handleNavigationClick('login')}>Login</Link>
                    <Link to="/register" onClick={() => handleNavigationClick('register')}>Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navigation;