import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { shipsApi } from "../../api/shipsApi";
import { addToCart } from "../../redux/actions";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Loader from "../../components/Loader/Loader";
import "./ShipDetailPage.css";

function ShipDetailPage() {
    const { id } = useParams();
    const [ship, setShip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState("cargo"); 
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShip = async () => {
            try {
                setLoading(true);
                const response = await shipsApi.getShipById(id);
                setShip(response.data);
                setLoading(false);
            } catch (err) {
                console.error('ShipDetailPage: Помилка:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchShip();
    }, [id]);

    const getMaxQuantity = () => {
        if (!ship) return 1;
        return selectedType === "cargo" ? ship.tonnage : ship.passengers;
    };

    const calculatePrice = () => {
        if (!ship) return 0;
        
        if (selectedType === "cargo") {
            return quantity * ship.price_per_ton;
        } else {
            return quantity * ship.price_per_person;
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        const maxQuantity = getMaxQuantity();
        
        if (value >= 1 && value <= maxQuantity) {
            setQuantity(value);
        }
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setQuantity(1);
    };

    const handleAddToCart = () => {
        if (!ship) return;

        const cartItem = {
            ...ship,
            selectedType,
            quantity,
            totalPrice: calculatePrice()
        };

        dispatch(addToCart(cartItem));
        shipsApi.logAction('log/add-to-cart', { 
            shipId: id, 
            shipName: ship.name,
            type: selectedType,
            quantity: quantity
        });
        
        navigate('/cart');
    };

    if (loading) {
        return <Loader text="Завантаження інформації про корабель..." />;
    }

    if (error || !ship) {
        return (
            <div className="ship-detail-page">
                <div className="not-found">
                    <h1>Корабель не знайдено</h1>
                    <p>{error}</p>
                    <Link to="/catalog">
                        <PrimaryButton>Повернутися до каталогу</PrimaryButton>
                    </Link>
                </div>
            </div>
        );
    }

    const maxQuantity = getMaxQuantity();

    return (
        <div className="ship-detail-page">
            <div className="ship-detail-container">
                <div className="ship-detail-image">
                    <img src={ship.image} alt={ship.name} />
                </div>
                <div className="ship-detail-info">
                    <h1>{ship.name}</h1>
                    <div className="ship-description">
                        <p>{ship.description}</p>
                    </div>
                    <div className="ship-details-grid">
                        <div className="detail-item">
                            <strong>Макс. тонаж:</strong> {ship.tonnage} т
                        </div>
                        <div className="detail-item">
                            <strong>Макс. пасажирів:</strong> {ship.passengers}
                        </div>
                        <div className="detail-item">
                            <strong>Швидкість:</strong> {ship.speed} вузлів
                        </div>
                        <div className="detail-item">
                            <strong>Пробіг:</strong> {ship.mileage} км
                        </div>
                        <div className="detail-item price-item">
                            <strong>Ціна за тонну:</strong> ${ship.price_per_ton}
                        </div>
                        <div className="detail-item price-item">
                            <strong>Ціна за людину:</strong> ${ship.price_per_person}
                        </div>
                    </div>
                    <div className="booking-section">
                        <h3>Бронювання</h3>
                        <div className="booking-controls">
                            <div className="type-selector">
                                <label>
                                    <strong>Тип бронювання:</strong>
                                    <select value={selectedType} onChange={handleTypeChange}>
                                        <option value="cargo">Вантаж (тони)</option>
                                        <option value="passengers">Пасажири</option>
                                    </select>
                                </label>
                            </div>
                            <div className="quantity-selector">
                                <label>
                                    <strong>Кількість:</strong>
                                    <input
                                        type="number"
                                        min="1"
                                        max={maxQuantity}
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                    />
                                    <span className="quantity-hint">
                                        (макс.: {maxQuantity} {selectedType === "cargo" ? "тон" : "пас."})
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="ship-detail-buttons">
                        <PrimaryButton onClick={handleAddToCart}>
                            Додати до кошика - ${calculatePrice()}
                        </PrimaryButton>
                        <Link to="/catalog">
                            <PrimaryButton>Назад до каталогу</PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShipDetailPage;