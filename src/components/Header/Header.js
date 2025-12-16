import React from "react";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import AuthButtons from "../AuthButtons/AuthButtons";
import "./Header.css";

function Header({ searchTerm, onSearchChange, isAuthenticated, setIsAuthenticated }) {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-container">
                    <div className="logo">LOGO</div>
                </div>
                
                <div className="nav-container">
                    <Navigation isAuthenticated={isAuthenticated} />
                </div>
                
                <div className="right-section">
                    <SearchBar 
                        searchTerm={searchTerm} 
                        onSearchChange={onSearchChange}
                        isAuthenticated={isAuthenticated}
                    />
                    <AuthButtons 
                        isAuthenticated={isAuthenticated} 
                        setIsAuthenticated={setIsAuthenticated} 
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;