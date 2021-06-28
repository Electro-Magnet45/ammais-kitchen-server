require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Food = require("./foodSchema.js");

const PORT = process.env.PORT || 5000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const connection_url = process.env.DATABASE_URL;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.get("/", (req, res) => res.send("Running"));

server.post("/api/findItems/all", (req, res) => {
  const key = req.body.apiKey;
  if (key !== process.env.API_KEY) res.status(500).send("Invalid API Key");

  Food.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

server.post("/api/newItem", (req, res) => {
  const body = req.body;
  if (body.apiKey !== process.env.API_KEY)
    res.status(500).send("Invalid API Key");

  Food.create(
    {
      name: body.name,
      description: body.description,
      photo: body.photo,
      status: body.status,
    },
    (err, data)
  );
});

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
