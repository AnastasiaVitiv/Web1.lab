import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../../redux/actions";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import "./CartPage.css";

function CartPage() {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();

    const handleRemove = (shipId, selectedType) => {
        dispatch(removeFromCart({ shipId, selectedType }));
    };

    const handleQuantityChange = (shipId, selectedType, newQuantity, maxQuantity) => {
        if (newQuantity < 1) return;
        if (newQuantity > maxQuantity) return;
        dispatch(updateQuantity({ shipId, selectedType, quantity: newQuantity }));
    };

    const calculateItemTotal = (item) => {
        if (item.selectedType === "cargo") {
            return item.quantity * item.price_per_ton;
        } else {
            return item.quantity * item.price_per_person;
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h1>Кошик</h1>
                <div className="empty-cart">
                    <p>Ваш кошик порожній</p>
                    <Link to="/catalog">
                        <PrimaryButton>Назад до каталогу</PrimaryButton>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Кошик</h1>
            
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={`${item.id}-${item.selectedType}`} className="cart-item">
                        <Link to={`/ship/${item.id}`} className="cart-item-link">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                        </Link>
                        
                        <div className="cart-item-content">
                            <Link to={`/ship/${item.id}`} className="cart-item-link">
                                <div className="cart-item-header">
                                    <h3 className="cart-item-title">{item.name}</h3>
                                </div>
                            </Link>
                            
                            <div className="cart-item-type">
                                <strong>
                                    {item.selectedType === "cargo" ? "Вантаж (тони)" : "Пасажири"}
                                </strong>
                                <span className="max-quantity">
                                    Максимально: {item.selectedType === "cargo" ? item.tonnage + " т" : item.passengers + " пас."}
                                </span>
                            </div>
                            
                            <div className="cart-item-controls">
                                <div className="quantity-section">
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => handleQuantityChange(
                                                item.id, 
                                                item.selectedType, 
                                                item.quantity - 1,
                                                item.selectedType === "cargo" ? item.tonnage : item.passengers
                                            )}
                                            disabled={item.quantity <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange(
                                                item.id, 
                                                item.selectedType, 
                                                item.quantity + 1,
                                                item.selectedType === "cargo" ? item.tonnage : item.passengers
                                            )}
                                            disabled={item.quantity >= (item.selectedType === "cargo" ? item.tonnage : item.passengers)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="item-total">
                                        <strong>${calculateItemTotal(item)}</strong>
                                    </div>
                                </div>
                                <PrimaryButton 
                                    onClick={() => handleRemove(item.id, item.selectedType)}
                                    className="remove-button"
                                >
                                    Видалити
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-footer">
                <div className="cart-total">
                    <h2>Загальна сума: ${calculateTotal()}</h2>
                    <div className="cart-navigation">
                        <Link to="/catalog">
                            <PrimaryButton className="back-to-catalog-btn">
                                Назад до каталогу
                            </PrimaryButton>
                        </Link>
                    </div>
                    <Link to="/checkout">
                        <PrimaryButton className="checkout-button">
                            Оформити замовлення
                        </PrimaryButton>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;