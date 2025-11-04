import React from "react";
import ShipCard from "../ShipCard/ShipCard";
import "./ShipList.css";

function ShipList({ ships }) {
    return (
        <section className="ship-list">
            {ships.length > 0 ? (
                ships.map((ship) => <ShipCard key={ship.id} ship={ship} />)
            ) : (
                <p>Нічого не знайдено.</p>
            )}
        </section>
    );
}

export default ShipList;
