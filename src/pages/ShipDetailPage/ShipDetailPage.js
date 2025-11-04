import React from "react";
import { useParams, Link } from "react-router-dom";
import { shipsData } from "../../components/Data/ShipsData";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import "./ShipDetailPage.css";

function ShipDetailPage() {
    const { id } = useParams();
    const ship = shipsData.find(ship => ship.id === parseInt(id));

    const addToCart = () => {
        alert(`Корабель "${ship.name}" додано до кошика!`);
    };

    if (!ship) {
        return (
            <div className="ship-detail-page">
                <div className="not-found">
                    <h1>Корабель не знайдено</h1>
                    <Link to="/catalog">
                        <PrimaryButton>Повернутися до каталогу</PrimaryButton>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ship-detail-page">
            <div className="ship-detail-container">
                <div className="ship-detail-image">
                    <img src={ship.image} alt={ship.name} />
                </div>
                <div className="ship-detail-info">
                    <h1>{ship.name}</h1>
                    <div className="ship-details-grid">
                        <div className="detail-item">
                            <strong>Тонаж:</strong> {ship.tonnage} т
                        </div>
                        <div className="detail-item">
                            <strong>Пасажирів:</strong> {ship.passengers}
                        </div>
                        <div className="detail-item">
                            <strong>Капітан:</strong> {ship.captain}
                        </div>
                        <div className="detail-item">
                            <strong>Швидкість:</strong> {ship.speed} вузлів
                        </div>
                        <div className="detail-item">
                            <strong>Пробіг:</strong> {ship.mileage} км
                        </div>
                    </div>
                    <div className="ship-description">
                        <h3>Опис</h3>
                        <p>{ship.description}</p>
                    </div>
                    <div className="ship-detail-buttons">
                        <PrimaryButton onClick={addToCart}>
                            Додати до кошика
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