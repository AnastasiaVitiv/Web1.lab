import React from "react";
import ShipList from "../../components/ShipList/ShipList";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Select from "../../components/Select/Select";
import "./CatalogPage.css";

function CatalogPage() {
    const tonnageOptions = [
        { value: "", label: "Всі тонажі" },
        { value: "0-1000", label: "До 1000 т" },
        { value: "1000-1500", label: "1000-1500 т" },
        { value: "1500+", label: "Більше 1500 т" }
    ];

    const passengersOptions = [
        { value: "", label: "Всі пасажири" },
        { value: "0-250", label: "До 250" },
        { value: "250-400", label: "250-400" },
        { value: "400+", label: "Більше 400" }
    ];

    const speedOptions = [
        { value: "", label: "Всі швидкості" },
        { value: "0-25", label: "До 25 вузлів" },
        { value: "25-30", label: "25-30 вузлів" },
        { value: "30+", label: "Більше 30 вузлів" }
    ];

    return (
        <div className="catalog-page">
            <div className="filters-section">
                <div className="filters-container">
                    <Select 
                        options={tonnageOptions}
                        value=""
                        onChange={() => {}}
                        label="Тонаж"
                    />
                    <Select 
                        options={passengersOptions}
                        value=""
                        onChange={() => {}}
                        label="Кількість пасажирів"
                    />
                    <Select 
                        options={speedOptions}
                        value=""
                        onChange={() => {}}
                        label="Швидкість"
                    />
                    <div className="apply-button">
                        <PrimaryButton>Apply</PrimaryButton>
                    </div>
                </div>
            </div>
            
            <h1>Каталог кораблів</h1>
            <ShipList />
            <div className="view-more">
                <PrimaryButton>View more</PrimaryButton>
            </div>
        </div>
    );
}

export default CatalogPage;