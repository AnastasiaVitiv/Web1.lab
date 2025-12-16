import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import CartPage from "./pages/CartPage/CartPage";
import ShipDetailPage from "./pages/ShipDetailPage/ShipDetailPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import "./App.css";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/catalog" element={<CatalogPage searchTerm={searchTerm} />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/ship/:id" element={<ShipDetailPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/success" element={<SuccessPage />} /> 
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
