const express = require("express");
const { Song, Album, Artist } = require("../models");
// const {  } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 1000000;

  const allSongs = await Song.findAll({
    limit: Number(limit),
    include: [
      {
        model: Album,
        attributes: ["title"],
      },
      {
        model: Artist,
        attributes: ["title"],
      },
    ],
  });

  res.json(allSongs);
});

router.get("/top", async (req, res) => {
  const limit = req.query.limit || 100000;
  const filters = {
    artist: "artistId",
    album: "albumId",
    title: "title",
  };
  const query = {
    limit: Number(limit),
    include: [
      {
        model: Album,
        attributes: ["title"],
      },
      {
        model: Artist,
        attributes: ["title"],
      },
    ],
  };
  const filterBy = req.query.filterBy;
  const value = req.query.value;

  if (filters[filterBy] && value) {
    query.where = {
      [filters[filterBy]]: value,
    };
  }
  console.log(filterBy);
  const topSongs = await Song.findAll(query);
  res.json(topSongs);
});

router.get("/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id, {
    include: [
      {
        model: Album,
        attributes: ["title"],
      },
      {
        model: Artist,
        attributes: ["title"],
      },
    ],
  });
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
