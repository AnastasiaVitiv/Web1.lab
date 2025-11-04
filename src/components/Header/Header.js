import React from "react";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="logo">LOGO</div>
            <Navigation />
            <SearchBar />
        </header>
    );
}

export default Header;