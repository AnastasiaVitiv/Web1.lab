const API_URL = "http://localhost:3000/ships";
const form = document.querySelector("#editForm");
const index = localStorage.getItem("editIndex");

async function loadShip() {
    try {
        const res = await fetch(`${API_URL}/${index}`, { method: "GET" });
        if (!res.ok) throw new Error("Не вдалося завантажити корабель");

        const ship = await res.json();

        document.querySelector("#name").value = ship.name;
        document.querySelector("#tonnage").value = ship.tonnage;
        document.querySelector("#passengers").value = ship.passenger_count;
        document.querySelector("#captain").value = ship.captain_name;
        document.querySelector("#speed").value = ship.speed;
        document.querySelector("#distance").value = ship.distance;

    } catch (err) {
        alert("Помилка: " + err.message);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedShip = {
        name: document.querySelector("#name").value.trim(),
        tonnage: +document.querySelector("#tonnage").value,
        passenger_count: +document.querySelector("#passengers").value,
        captain_name: document.querySelector("#captain").value.trim(),
        speed: +document.querySelector("#speed").value,
        distance: +document.querySelector("#distance").value
    };

    try {
        const res = await fetch(`${API_URL}/${index}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedShip)
        });

        if (!res.ok) throw new Error("Не вдалося оновити корабель");

        alert("Корабель оновлено!");
        window.location.href = "index.html";

    } catch (err) {
        alert(" Помилка: " + err.message);
    }
});

loadShip();
