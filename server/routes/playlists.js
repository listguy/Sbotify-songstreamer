const express = require("express");
const { Playlist, Song } = require("../models");
let router = express.Router();

router.get("/top", async (req, res) => {
  const limit = req.query.limit || 7;

  const allPlaylists = await Playlist.findAll({
    limit: Number(limit),
  });
  res.json(allPlaylists);
});

router.get("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id, {
    include: {
      model: Song,
      attributes: ["title", "artist", "album", "media", "length"],
    },
  });

  res.json(playlist);
});

module.exports = router;
