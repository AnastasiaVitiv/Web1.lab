let ships = JSON.parse(localStorage.getItem("ships")) || [
    { tonnage: 15555, name: "Leonard", passenger_count: 555, captain_name: "Lui", speed: 55, distance: 2444 },
    { tonnage: 27777, name: "Di", passenger_count: 777, captain_name: "Devid", speed: 77, distance: 455 },
    { tonnage: 32222, name: "Caprio", passenger_count: 222, captain_name: "Lui", speed: 22, distance: 99 },
    { tonnage: 0, name: "Unknown", passenger_count: 0, captain_name: "", speed: 3333, distance: 0 }
];

localStorage.setItem("ships", JSON.stringify(ships));

const list = document.querySelector("#list");
const result = document.querySelector("#result");
const searchInput = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");

let currentData = [...ships];
let sortAsc = true;

function render(data) {
    list.innerHTML = "";

    data.forEach((ship, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <strong>${ship.name}</strong><br>
            Тоннаж: ${ship.tonnage}<br>
            Пасажири: ${ship.passenger_count}<br>
            Капітан: ${ship.captain_name}<br>
            Швидкість: ${ship.speed}<br>
            Пробіг: ${ship.distance}<br>
            <button class="edit" data-index="${index}">Edit</button>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        list.appendChild(card);
    });

    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener("click", e => {
            const i = e.target.dataset.index;
            localStorage.setItem("shipToEditIndex", i);
            window.location.href = "edit.html";
        });
    });

    document.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", e => {
            const i = e.target.dataset.index;
            ships.splice(i, 1);
            localStorage.setItem("ships", JSON.stringify(ships));
            currentData = [...ships];
            render(currentData);
        });
    });

    const total = data.reduce((sum, ship) => sum + Number(ship.passenger_count), 0);
    result.textContent = `Загальна кількість пасажирів: ${total}`;
}

searchInput.addEventListener("input", e => {
    const query = e.target.value.trim().toLowerCase();
    const filtered = ships.filter(ship =>
        ship.captain_name.toLowerCase().includes(query)
    );
    currentData = filtered;
    render(currentData);
});

sortBtn.addEventListener("click", () => {
    currentData.sort((a, b) =>
        sortAsc ? a.distance - b.distance : b.distance - a.distance
    );
    sortAsc = !sortAsc;
    render(currentData);
});

render(currentData);

const dfsfhs = function() {
    
}

