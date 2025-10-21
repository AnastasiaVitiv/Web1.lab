const API_URL = "http://localhost:3000/ships";
const list = document.querySelector("#list");
const result = document.querySelector("#result");
const searchInput = document.querySelector("#search");
const sortBtn = document.querySelector("#sort");

let ships = [];
let sortAsc = true;

async function loadShips(url = API_URL) {
  try {
    const res = await fetch(url, { method: "GET" }); 
    ships = await res.json();
    render(ships);
  } catch (err) {
    console.error("Помилка при завантаженні кораблів:", err);
  }
}

async function addShip(newShip) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newShip),
  });
  loadShips();
}

async function updateShip(index, updatedShip) {
  await fetch(`${API_URL}/${index}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedShip),
  });
  loadShips();
}

async function deleteShip(index) {
  await fetch(`${API_URL}/${index}`, { method: "DELETE" });
  loadShips();
}

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
      <button onclick="editShip(${index})">Edit</button>
      <button onclick="deleteShip(${index})">Remove</button>
    `;
    list.appendChild(card);
  });

  const total = data.reduce((sum, ship) => sum + ship.passenger_count, 0);
  result.textContent = `Загальна кількість пасажирів: ${total}`;
}

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  const url = query ? `${API_URL}?captain=${query}` : API_URL;
  await loadShips(url);
});

sortBtn.addEventListener("click", async () => {
  const order = sortAsc ? "asc" : "desc";
  await loadShips(`${API_URL}?sort=distance&order=${order}`);
  sortAsc = !sortAsc;
});

function editShip(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "edit.html";
}

loadShips();
