const express = require("express");
const { Song } = require("../models");
const { Album } = require("../models");
const { Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10000000;

  const allArtists = await Artist.findAll({
    limit: Number(limit),
    include: [Album, Song],
    //{ model: Album, include: Song } to include all songs of album, use this
  });
  res.json(allArtists);
});

router.get("/:id", async (req, res) => {
  const artist = await Artist.findAll({
    where: {
      id: req.params.id,
    },
    include: [Album, Song],
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
