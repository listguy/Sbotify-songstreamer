const express = require("express");
const { Playlist, Song } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10000000;

  const allPlaylists = await Playlist.findAll({
    limit: Number(limit),
    include: [
      {
        model: Song,
      },
    ],
  });
  res.json(allPlaylists);
});

module.exports = router;
