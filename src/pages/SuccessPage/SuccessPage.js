import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import "./SuccessPage.css";

function SuccessPage() {
    return (
        <div className="success-page">
            <div className="success-container">
                <div className="success-icon"></div>
                <h1>Success!</h1>
                <p className="success-message">
                    Your order was sent to processing!<br />
                    Check your email box for further information.
                </p>
                
                <div className="success-buttons">
                    <Link to="/catalog">
                        <PrimaryButton className="secondary-button">
                            Go back to Catalog
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;