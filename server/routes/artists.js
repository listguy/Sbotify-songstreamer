const express = require("express");
const { Song } = require("../models");
const { Album } = require("../models");
const { Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit, order = "ASC" } = Number(req.query) || 10000000;

  const allArtists = await Artist.findAll({
    limit: limit,
    order: [["title", order]],
    // include: [Album, Song],
    //{ model: Album, include: Song } to include all songs of album, use this
  });
  res.json(allArtists);
});

router.get("/top", async (req, res) => {
  const { limit } = Number(req.query) || 10000000;

  const allArtists = await Artist.findAll({
    limit: limit,
    // include: [Album, Song],
    //{ model: Album, include: Song } to include all songs of album, use this
  });
  res.json(allArtists);
});

router.get("/:id", async (req, res) => {
  const { limitSongs } = req.query || 100000;

  const artist = await Artist.findByPk(req.params.id, {
    include: [
      { model: Album, attributes: ["id", "title", "media", "created_at"] },
      {
        model: Song,
        include: { model: Album, attributes: ["title"] },
        attributes: ["id", "title", "length", "media", "views"],
        limit: Number(limitSongs),
      },
    ],
  });
  res.json(artist);
});

router.post("/", async (req, res) => {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist);
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedArtist = await Artist.update(fields, {
    where: {
      id: req.params.id,
    },
  });

  res.json(updatedArtist);
});

router.delete("/:id", async (req, res) => {
  await Artist.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

module.exports = router;
