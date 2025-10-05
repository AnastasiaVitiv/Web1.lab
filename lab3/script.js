const ships = [
  { tonnage: 15555, name: "Leonard", passenger_count: 555, captain_name: "Lui", speed: 55, distance: 2444 },
  { tonnage: 27777, name: "Di", passenger_count: 777, captain_name: "Devid", speed: 77, distance: 455 },
  { tonnage: 32222, name: "Caprio", passenger_count: 222, captain_name: "Lui", speed: 22, distance: 99 },
  { tonnage: 0, name: "Unknown", passenger_count: 0, captain_name: "", speed: 3333, distance: 0 }
];

const list = document.querySelector("#list");
const result = document.querySelector("#result");
const searchInput = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");

let currentData = [...ships];
let sortAsc = true; 

function render(data) {
  list.innerHTML = "";
  data.forEach(ship => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <strong>${ship.name}</strong><br>
      Тоннаж: ${ship.tonnage}<br>
      Пасажири: ${ship.passenger_count}<br>
      Капітан: ${ship.captain_name}<br>
      Швидкість: ${ship.speed}<br>
      Пробіг: ${ship.distance}<br>
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
    `;
    list.appendChild(card);
  });

  const total = data.reduce((sum, ship) => sum + ship.passenger_count, 0);
  result.textContent = `Загальна кількість пасажирів: ${total}`;
}

render(currentData);

searchInput.addEventListener("input", e => {
  const query = e.target.value.trim().replace(/\s+/g, "").toLowerCase(); 
  const filtered = ships.filter(ship =>
    ship.captain_name.trim().replace(/\s+/g, "").toLowerCase().includes(query)
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
