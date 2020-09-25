const express = require("express");
const { Playlist, Song, Album, Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit, order = "ASC" } = Number(req.query) || 100000;

  const allPlaylists = await Playlist.findAll({
    limit: limit,
    order: [["title", order]],
  });

  res.json(allPlaylists);
});

router.get("/top", async (req, res) => {
  const { limit } = Number(req.query) || 7;

  const topPlaylists = await Playlist.findAll({
    limit: limit,
  });
  res.json(topPlaylists);
});

router.get("/:id", async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.id, {
    include: {
      model: Song,
      attributes: ["id", "title", "media", "length", "views"],
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
