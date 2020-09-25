const express = require("express");
const { Song, Album, Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit } = Number(req.query) || 1000000;

  const allAlbums = await Album.findAll({
    limit: limit,
    include: [{ model: Artist, attributes: ["id", "title"] }],
  });

  res.json(allAlbums);
});

router.get("/top", async (req, res) => {
  const { limit = 100000, order = "" } = req.query;
  // const { limit = 100000, filter = "id", value = -1 } = req.query || 10000000;
  // let allAlbums;
  // if (filter !== "id") {
  //   allAlbums = await Album.findAll({
  //     limit: Number(limit),
  //     where: {
  //       [filter]: value,
  //     },
  //     include: [{ model: Artist, attributes: ["title"], as: "artist" }],
  //     limit: 7,
  //   });
  // } else {
  //   allAlbums = await Album.findAll({
  //     limit: Number(limit),
  //     include: [{ model: Artist, attributes: ["title"], as: "artist" }],
  //     limit: 7,
  //   });
  // }
  const topAlbums = await Album.findAll({
    include: { model: Artist, attributes: ["id", "title"] },
    attributes: ["id", "title", "media"],
    limit: Number(limit),
  });

  res.json(topAlbums);
});

router.get("/:id", async (req, res) => {
  const album = await Album.findByPk(req.params.id, {
    include: [
      {
        model: Song,
        attributes: ["id", "title", "length", "track_number", "media", "views"],
      },
      { model: Artist, attributes: ["id", "title", "media"] },
    ],
  });
  res.json(album);
});

//need to improve below methods, so child are affected too.
router.post("/", async (req, res) => {
  const newAlbum = await Album.create(req.body);
  res.json(newAlbum);
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedAlbum = await Album.update(fields, {
    where: {
      id: req.params.id,
    },
  });

  res.json(updatedAlbum);
});

router.delete("/:id", async (req, res) => {
  await Album.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

module.exports = router;
