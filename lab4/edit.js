document.addEventListener("DOMContentLoaded", () => {
    const ship = JSON.parse(localStorage.getItem("newShip"));
    if (ship) {
        document.querySelector("#name").value = ship.name;
        document.querySelector("#captain").value = ship.captain_name;
        document.querySelector("#speed").value = ship.speed;
        document.querySelector("#distance").value = ship.distance;
    }
});

document.querySelector("#editForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const captain = document.querySelector("#captain").value.trim();

    if (!name || !captain) {
        alert("Усі поля мають бути заповнені!");
        return;
    }

    alert("Зміни збережено!");
    window.location.href = "index.html";
});
