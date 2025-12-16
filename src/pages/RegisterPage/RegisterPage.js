import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { initializeCartForNewUser } from '../../utils/cartUtils';
import './RegisterPage.css';

const RegisterPage = ({ setIsAuthenticated, isAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const validateGmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!validateGmail(email)) {
            setError('Please use a valid Gmail address (example@gmail.com)');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!usernameRegex.test(username)) {
            setError('Username can only contain letters and numbers');
            return;
        }

        try {
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
            if (existingUsers[email]) {
                setError('This email is already registered');
                return;
            }

            const userData = {
                email: email,
                password: password,
                username: username,
                cart: [] 
            };

            existingUsers[email] = userData;
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

            localStorage.setItem('currentUserEmail', email);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userUsername', username);
            
            initializeCartForNewUser(email);
            
            setIsAuthenticated(true);
            navigate('/');
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-box">
                    <div className="register-header">
                        <h2>Register the new account</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="form-group">
                            <label>Username (letters and numbers only)</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                                pattern="[a-zA-Z0-9]+"
                                title="Only letters and numbers allowed"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>E-mail (Gmail only)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="yourname@gmail.com"
                                required
                                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                                title="Please use a valid Gmail address"
                            />
                            <small className="email-hint">Only @gmail.com addresses are accepted</small>
                        </div>
                        
                        <div className="form-group">
                            <label>Password (min. 6 characters)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                minLength="6"
                            />
                        </div>
                        
                        <button type="submit" className="submit-button">
                            SOON ME UP
                        </button>
                    </form>
                    
                    <div className="register-footer">
                        <p>
                            <strong>Already a member?</strong>{' '}
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;