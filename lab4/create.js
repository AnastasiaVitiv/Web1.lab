document.querySelector("#createForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const tonnage = +document.querySelector("#tonnage").value;
    const passengers = +document.querySelector("#passengers").value;
    const captain = document.querySelector("#captain").value.trim();
    const speed = +document.querySelector("#speed").value;
    const distance = +document.querySelector("#distance").value;

    if (!name || !captain) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    const newShip = { name, tonnage, passenger_count: passengers, captain_name: captain, speed, distance };

    const ships = JSON.parse(localStorage.getItem("ships")) || [];
    ships.push(newShip);
    localStorage.setItem("ships", JSON.stringify(ships));

    alert("Корабель успішно створено!");
    window.location.href = "index.html";
});
