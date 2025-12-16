import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CartPage from "./pages/CartPage/CartPage";
import ShipDetailPage from "./pages/ShipDetailPage/ShipDetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { setCart } from "./redux/actions";
import "./App.css";

function AppWrapper() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const userEmail = localStorage.getItem('userEmail');
            setIsAuthenticated(!!userEmail && userEmail.trim() !== '');
        };
        
        checkAuth();
        
        if (!localStorage.getItem('registeredUsers')) {
            localStorage.setItem('registeredUsers', JSON.stringify({}));
        }
        
        const currentUserEmail = localStorage.getItem('currentUserEmail');
        if (currentUserEmail) {
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
            const userData = registeredUsers[currentUserEmail];
            
            if (userData && userData.cart) {
                dispatch(setCart(userData.cart));
            }
        }
        
        const handleStorageChange = () => {
            checkAuth();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [dispatch]);

    useEffect(() => {
        const saveCartOnUnload = () => {
            const currentUserEmail = localStorage.getItem('currentUserEmail');
            if (currentUserEmail && store) {
                const state = store.getState();
                const cartItems = state.cartItems || [];
                
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
                if (registeredUsers[currentUserEmail]) {
                    registeredUsers[currentUserEmail].cart = cartItems;
                    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                }
            }
        };

        window.addEventListener('beforeunload', saveCartOnUnload);
        
        return () => {
            window.removeEventListener('beforeunload', saveCartOnUnload);
        };
    }, []);

    const handleAuthChange = (newAuthState) => {
        setIsAuthenticated(newAuthState);
        
        if (newAuthState) {
            const currentUserEmail = localStorage.getItem('currentUserEmail');
            if (currentUserEmail) {
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
                const userData = registeredUsers[currentUserEmail];
                
                if (userData && userData.cart) {
                    dispatch(setCart(userData.cart));
                } else {
                    dispatch(setCart([]));
                }
            }
        } else {
            dispatch(setCart([]));
        }
    };

    return (
        <Router>
            <div className="App">
                <Header 
                    searchTerm={searchTerm} 
                    onSearchChange={setSearchTerm}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={handleAuthChange}
                />
                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={
                            <LoginPage 
                                setIsAuthenticated={handleAuthChange} 
                                isAuthenticated={isAuthenticated}
                            />
                        } />
                        <Route path="/register" element={
                            <RegisterPage 
                                setIsAuthenticated={handleAuthChange} 
                                isAuthenticated={isAuthenticated}
                            />
                        } />
                        
                        <Route path="/" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <HomePage />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/catalog" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <CatalogPage searchTerm={searchTerm} />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/cart" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <CartPage />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/ship/:id" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <ShipDetailPage />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/checkout" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <CheckoutPage />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/success" element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <SuccessPage />
                            </ProtectedRoute>
                        } />
                    
                        <Route path="*" element={
                            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

function App() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}

export default App;