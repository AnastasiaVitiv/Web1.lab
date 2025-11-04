import React from "react";
import "./SearchBar.css";

function SearchBar() {
    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Пошук кораблів..." 
                className="search-input"
            />
            <button className="search-button">Пошук</button>
        </div>
    );
}

export default SearchBar;