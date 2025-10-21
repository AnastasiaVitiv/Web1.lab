const API_URL = "http://localhost:3000/ships";

document.querySelector("#createForm").addEventListener("submit", async e => {
  e.preventDefault();

  const newShip = {
    name: document.querySelector("#name").value.trim(),
    tonnage: +document.querySelector("#tonnage").value,
    passenger_count: +document.querySelector("#passengers").value,
    captain_name: document.querySelector("#captain").value.trim(),
    speed: +document.querySelector("#speed").value,
    distance: +document.querySelector("#distance").value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newShip)
    });

    if (!res.ok) throw new Error("Помилка при створенні корабля");

    alert("Корабель створено!");
    window.location.href = "index.html";  
  } catch (err) {
    alert(" Не вдалося створити корабель: " + err.message);
  }
});
