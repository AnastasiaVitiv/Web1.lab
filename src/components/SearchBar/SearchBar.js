import React from "react";
import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange, isAuthenticated }) {
    const handleClear = () => {
        onSearchChange("");
    };

    if (!isAuthenticated) {
        return (
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Login to search"
                    disabled
                    className="search-input disabled"
                />
            </div>
        );
    }

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search ships..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            {searchTerm && (
                <button 
                    className="search-clear" 
                    onClick={handleClear}
                    aria-label="Clear search"
                    type="button"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;