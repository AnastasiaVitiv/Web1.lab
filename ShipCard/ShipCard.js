import React from "react";
import "./ShipCard.css";

function ShipCard({ ship }) {
    return (
        <div className="ship-card">
            <img
                src={ship.image} 
                alt={ship.name}
            />
            <h3>{ship.name}</h3>
            <p><strong>Тонаж:</strong> {ship.tonnage} т</p>
            <p><strong>Пасажирів:</strong> {ship.passengers}</p>
            <p><strong>Капітан:</strong> {ship.captain}</p>
            <p><strong>Швидкість:</strong> {ship.speed} вузлів</p>
            <p><strong>Пробіг:</strong> {ship.mileage} км</p>

            <div className="card-buttons">
                <button className="edit-btn">Змінити</button>
                <button className="delete-btn">Видалити</button>
            </div>
        </div>
    );
}

export default ShipCard;
