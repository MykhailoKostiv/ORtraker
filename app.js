const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("./client/build"));

app.listen(3001);

app.get("/teams", async (req, res) => {
  const teams = await axios({
    method: "get",
    url: "https://osinnij-raid-2023-b0097a35cf80.herokuapp.com/teams",
  });
  console.log(teams);

  res.json(teams.data);
});

app.get("/teams/:id", async (req, res) => {
  const teams = await axios({
    method: "get",
    url: `https://osinnij-raid-2023-b0097a35cf80.herokuapp.com/teams/${req.params.id}`,
  });
  console.log(req.params);

  res.json(teams.data);
});
