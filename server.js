const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const file = "./ships.json";

app.get("/ships", (req, res) => {
  let ships = JSON.parse(fs.readFileSync(file));

  if (req.query.captain) {
    const query = req.query.captain.toLowerCase();
    ships = ships.filter(ship =>
      ship.captain_name.toLowerCase().includes(query)
    );
  }

  if (req.query.sort) {
    const field = req.query.sort;
    const order = req.query.order === "desc" ? -1 : 1;

    ships.sort((a, b) => {
      if (typeof a[field] === "number" && typeof b[field] === "number")
        return (a[field] - b[field]) * order;
      return a[field].toString().localeCompare(b[field].toString()) * order;
    });
  }

  res.json(ships);
});

app.get("/ships/:index", (req, res) => {
  const ships = JSON.parse(fs.readFileSync(file));
  const index = +req.params.index;

  if (index < 0 || index >= ships.length)
    return res.status(404).json({ message: "Корабель не знайдено" });

  res.json(ships[index]);
});

app.post("/ships", (req, res) => {
  const ships = JSON.parse(fs.readFileSync(file));
  ships.push(req.body);
  fs.writeFileSync(file, JSON.stringify(ships, null, 2));
  res.status(201).json({ message: "Корабель створено" });
});

app.put("/ships/:index", (req, res) => {
  const ships = JSON.parse(fs.readFileSync(file));
  const index = +req.params.index;

  if (index < 0 || index >= ships.length)
    return res.status(404).json({ message: "Корабель не знайдено" });

  ships[index] = req.body;
  fs.writeFileSync(file, JSON.stringify(ships, null, 2));
  res.json({ message: "Корабель оновлено" });
});

app.delete("/ships/:index", (req, res) => {
  const ships = JSON.parse(fs.readFileSync(file));
  const index = +req.params.index;

  if (index < 0 || index >= ships.length)
    return res.status(404).json({ message: "Корабель не знайдено" });

  ships.splice(index, 1);
  fs.writeFileSync(file, JSON.stringify(ships, null, 2));
  res.json({ message: "Корабель видалено" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
