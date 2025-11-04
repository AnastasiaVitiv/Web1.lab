import React from "react";
import ShipList from "../../components/ShipList/ShipList";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page">
            <section className="hero">
                <img src="/images/160208.jpg" alt="Main visual" />
                <div className="hero-text">
                    <h1>Список кораблів</h1>
                    <p>
                        Ласкаво просимо до нашої колекції кораблів! Тут ви знайдете
                        різноманітні судна — від величних круїзних лайнерів до швидких
                        військових кораблів. Досліджуйте характеристики кожного корабля,
                        включаючи тоннаж, кількість пасажирів, капітана, швидкість і пробіг.
                    </p>
                </div>
            </section>
            <ShipList />
        </div>
    );
}

export default HomePage;