import React from "react";
import "./FormError.css";

function FormError({ message }) {
    if (!message) return null;
    
    return (
        <div className="form-error">
            <div className="error-icon"></div>
            <div className="error-message">
                <strong>Oh snap!</strong> {message}
            </div>
        </div>
    );
}

export default FormError;