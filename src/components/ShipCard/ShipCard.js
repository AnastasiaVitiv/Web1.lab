import React from "react";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import "./ShipCard.css";

function ShipCard({ ship }) {
    return (
        <div className="ship-card">
            <img src={ship.image} alt={ship.name} />
            <h3>{ship.name}</h3>
            <p><strong>Тонаж:</strong> {ship.tonnage} т</p>
            <p><strong>Кількість пасажирів:</strong> {ship.passengers}</p>
            <p><strong>Капітан:</strong> {ship.captain}</p>
            <p><strong>Швидкість:</strong> {ship.speed} вузлів</p>
            <p><strong>Пробіг:</strong> {ship.mileage} км</p>

            <div className="card-buttons">
                <PrimaryButton>View more</PrimaryButton>
            </div>
        </div>
    );
}

export default ShipCard;