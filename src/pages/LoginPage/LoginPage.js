import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadUserCart } from '../../utils/cartUtils';
import './LoginPage.css';

const LoginPage = ({ setIsAuthenticated, isAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
            const userData = registeredUsers[email];
            
            if (userData && userData.password === password) {
                // Зберігаємо поточного користувача
                localStorage.setItem('currentUserEmail', email);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userUsername', userData.username);
                
                // Завантажуємо кошик цього користувача
                loadUserCart(email);
                
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-header">
                        <h2>Submit the form to sign in</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <div className="error-message">{error}</div>}
                        
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        
                        <button type="submit" className="submit-button">
                            LOOK ME
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <p>
                            <strong>Not a member?</strong>{' '}
                            <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;