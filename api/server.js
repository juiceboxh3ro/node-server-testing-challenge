const express = require("express");

const Doggos = require("../models/doggoModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/doggos", (req, res) => {
  Doggos.getAll()
    .then(doggos => {
      res.status(200).json(doggos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/doggos', (req, res) => {
  const doggo = req.body

  Doggos.insert(doggo)
  .then(doggo => {
    res.status(201).json({ message: "doggo created successfully" })
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.delete('/doggos/:id', (req, res) => {
  const id = req.params.id

  Doggos.remove(id)
  .then(() => {
    res.status(200).json({ message: "doggo removed successfully" })
  })
  .catch(err => {
    res.status(500).json({ error: err.message })
  })
})

module.exports = server;
