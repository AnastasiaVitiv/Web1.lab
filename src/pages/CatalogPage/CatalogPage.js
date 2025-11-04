import React, { useState, useMemo } from "react";
import { shipsData } from "../../components/Data/ShipsData";
import ShipList from "../../components/ShipList/ShipList";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import Select from "../../components/Select/Select";
import "./CatalogPage.css";

function CatalogPage({ searchTerm = "" }) { 
    const [filters, setFilters] = useState({
        tonnage: '',
        passengers: '',
        speed: ''
    });
    const [visibleShipsCount, setVisibleShipsCount] = useState(3);

    const filteredShips = useMemo(() => {
        return shipsData.filter(ship => {
            if (!ship.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            if (filters.tonnage) {
                if (filters.tonnage === '0-1000' && ship.tonnage > 1000) return false;
                if (filters.tonnage === '1000-1500' && (ship.tonnage <= 1000 || ship.tonnage > 1500)) return false;
                if (filters.tonnage === '1500+' && ship.tonnage <= 1500) return false;
            }

            if (filters.passengers) {
                if (filters.passengers === '0-250' && ship.passengers > 250) return false;
                if (filters.passengers === '250-400' && (ship.passengers <= 250 || ship.passengers > 400)) return false;
                if (filters.passengers === '400+' && ship.passengers <= 400) return false;
            }

            if (filters.speed) {
                if (filters.speed === '0-25' && ship.speed > 25) return false;
                if (filters.speed === '25-30' && (ship.speed <= 25 || ship.speed > 30)) return false;
                if (filters.speed === '30+' && ship.speed <= 30) return false;
            }

            return true;
        });
    }, [filters, searchTerm]); 

    const visibleShips = filteredShips.slice(0, visibleShipsCount);
    const hasMoreShips = visibleShipsCount < filteredShips.length;

    const loadMoreShips = () => setVisibleShipsCount(prev => prev + 2);
    const handleFilterChange = (filterType, value) =>
        setFilters(prev => ({ ...prev, [filterType]: value }));
    const applyFilters = () => setVisibleShipsCount(3);

    const tonnageOptions = [
        { value: "", label: " Всі тонажі" },
        { value: "0-1000", label: " До 1000 т" },
        { value: "1000-1500", label: " 1000-1500 т" },
        { value: "1500+", label: "Більше 1500 т" }
    ];

    const passengersOptions = [
        { value: "", label: " Всі пасажири" },
        { value: "0-250", label: " До 250 пасажирів" },
        { value: "250-400", label: " 250-400 пасажирів" },
        { value: "400+", label: " Більше 400 пасажирів" }
    ];

    const speedOptions = [
        { value: "", label: " Всі швидкості" },
        { value: "0-25", label: " До 25 вузлів" },
        { value: "25-30", label: " 25-30 вузлів" },
        { value: "30+", label: "Більше 30 вузлів" }
    ];

    return (
        <div className="catalog-page">
            <div className="filters-section">
                <div className="filters-container">
                    <Select
                        options={tonnageOptions}
                        value={filters.tonnage}
                        onChange={(e) => handleFilterChange('tonnage', e.target.value)}
                        label="Тонаж"
                    />
                    <Select
                        options={passengersOptions}
                        value={filters.passengers}
                        onChange={(e) => handleFilterChange('passengers', e.target.value)}
                        label="Кількість пасажирів"
                    />
                    <Select
                        options={speedOptions}
                        value={filters.speed}
                        onChange={(e) => handleFilterChange('speed', e.target.value)}
                        label="Швидкість"
                    />
                    <div className="apply-button">
                        <PrimaryButton onClick={applyFilters}>Apply</PrimaryButton>
                    </div>
                </div>
            </div>

            <h1>Каталог кораблів</h1>
            <ShipList ships={visibleShips} />

            {hasMoreShips && (
                <div className="view-more">
                    <PrimaryButton onClick={loadMoreShips}>Показати ще</PrimaryButton>
                </div>
            )}
        </div>
    );
}

export default CatalogPage;
