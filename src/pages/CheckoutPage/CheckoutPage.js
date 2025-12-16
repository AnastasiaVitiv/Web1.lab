import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        const savedUserData = localStorage.getItem('userData');
        const savedEmail = localStorage.getItem('userEmail');
        const savedUsername = localStorage.getItem('userUsername');

        if (savedUserData) {
            const parsedData = JSON.parse(savedUserData);
            setUserData(parsedData);
            
            setShippingInfo(prev => ({
                ...prev,
                fullName: parsedData.username || savedUsername || '',
                email: parsedData.email || savedEmail || '',
                ...parsedData.shippingInfo
            }));
        } else if (savedEmail || savedUsername) {
            setShippingInfo(prev => ({
                ...prev,
                email: savedEmail || '',
                fullName: savedUsername || ''
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (userData) {
            const updatedUserData = {
                ...userData,
                shippingInfo: {
                    ...userData.shippingInfo,
                    ...shippingInfo
                }
            };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }

        navigate('/success');
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            
            <div className="checkout-container">
                <div className="shipping-form">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={shippingInfo.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={shippingInfo.email}
                                onChange={handleInputChange}
                                placeholder="yourname@gmail.com"
                                required
                                pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
                                title="Please use your Gmail address"
                            />
                            <small className="email-hint">Your registered Gmail address</small>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                placeholder="Street address"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingInfo.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={shippingInfo.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Postal code"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={shippingInfo.phone}
                                onChange={handleInputChange}
                                placeholder="Phone number"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-order-btn">
                            Complete Purchase
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;