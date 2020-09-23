const express = require("express");
const { Song } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const allSongs = await Song.findAll();
  res.json(allSongs);
});

module.exports = router;
