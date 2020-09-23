const express = require("express");
const { Song } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10000000;

  const allSongs = await Song.findAll({ limit: Number(limit) });
  res.json(allSongs);
});

router.get("/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id);
  res.json(song);
});

router.post("/", async (req, res) => {
  const newSong = await Song.create(req.body, {
    fields: [
      "albumId",
      "artistId",
      "title",
      "media",
      "trackNumber",
      "lyrics",
      "length",
      "views",
      "createdAt",
    ],
  });
  res.json(newSong);
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedSong = await Song.update(fields, {
    where: {
      id: req.params.id,
    },
  });

  res.json(updatedSong);
});

router.delete("/:id", async (req, res) => {
  await Song.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

module.exports = router;
