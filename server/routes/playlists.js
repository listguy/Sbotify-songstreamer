const express = require("express");
const { Playlist, Song, Album, Artist } = require("../models");
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
      attributes: ["title", "media", "length"],
      include: {
        model: Album,
        attributes: ["id", "title"],
      },
      include: {
        model: Artist,
        attributes: ["id", "title", "media"],
      },
    },
  });

  res.json(playlist);
});

module.exports = router;
