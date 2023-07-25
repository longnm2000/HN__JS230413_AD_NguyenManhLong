const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const fs = require("fs");

// Form HTML (action, method)
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch api
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/users", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./data/db.json"));
    res.json({
      data: data,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
      status: "fail",
      message: "Invalid",
    });
  }
});

app.post("/users", (req, res) => {
  const { player1, player2, player3, player4 } = req.body;
  console.log(player1, player2, player3, player4);
  try {
    let data = JSON.parse(fs.readFileSync("./data/db.json", "utf-8"));
    data.users.push({
      id: Math.floor(Math.random() * 1000000000),
      name: player1,
    });
    data.users.push({
      id: Math.floor(Math.random() * 1000000000),
      name: player2,
    });
    data.users.push({
      id: Math.floor(Math.random() * 1000000000),
      name: player3,
    });
    data.users.push({
      id: Math.floor(Math.random() * 1000000000),
      name: player4,
    });
    console.log(data);
    fs.writeFileSync("./data/db.json", JSON.stringify(data), "utf-8");
    res.json({
      message: "Create user success",
      status: "success",
    });
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

app.post("/rounds", (req, res) => {
  const round = req.body;
  console.log(round);
  try {
    let data = JSON.parse(fs.readFileSync("./data/db.json", "utf-8"));
    data.rounds.push(round);

    fs.writeFileSync("./data/db.json", JSON.stringify(data), "utf-8");
    res.json({
      message: "Create round success",
      status: "success",
    });
  } catch (error) {
    res.json({
      error,
      message: "Invalid",
      status: "fail",
    });
  }
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
