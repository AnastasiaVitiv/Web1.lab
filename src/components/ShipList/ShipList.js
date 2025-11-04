import React from "react";
import ShipCard from "../ShipCard/ShipCard";
import "./ShipList.css";

function ShipList() {
    const ships = [
        {
            id: 1,
            name: "Aurora",
            tonnage: 1200,
            passengers: 340,
            captain: "Іван Петренко",
            speed: 28,
            mileage: 12000,
            image: "/images/unnamed.jpg",
        },
        {
            id: 2,
            name: "Neptune",
            tonnage: 950,
            passengers: 220,
            captain: "Олег Коваль",
            speed: 24,
            mileage: 9800,
            image: "/images/images.jpeg",
        },
        {
            id: 3,
            name: "Orion",
            tonnage: 1500,
            passengers: 410,
            captain: "Марія Сидоренко",
            speed: 30,
            mileage: 15000,
            image: "/images/images (1).jpeg",
        },
    ];

    return (
        <section className="ship-list">
            {ships.map((ship) => (
                <ShipCard key={ship.id} ship={ship} />
            ))}
        </section>
    );
}

export default ShipList;
