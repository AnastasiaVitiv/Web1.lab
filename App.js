import React from "react";
import Header from "./components/Header/Header";
// import Navigation from "./components/Navigation/Navigation";
import ShipList from "./components/ShipList/ShipList";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
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
        <div className="view-more">
          <button>View more</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
