const express = require("express");
const { Song, Album, Artist } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const allAlbums = await Album.findAll({
    limit: Number(limit),
    include: [{ model: Artist, attributes: ["title"], as: "artist" }],
  });

  res.json(allAlbums);
});

router.get("/top", async (req, res) => {
  const limit = req.query.limit || 10000000;
  const filter = req.query.filter || "id";
  const value = req.query.value || -1;
  let allAlbums;

  if (filter !== "id") {
    allAlbums = await Album.findAll({
      limit: Number(limit),
      where: {
        [filter]: value,
      },
      include: [{ model: Artist, attributes: ["title"], as: "artist" }],
      limit: 7,
    });
  } else {
    allAlbums = await Album.findAll({
      limit: Number(limit),
      include: [{ model: Artist, attributes: ["title"], as: "artist" }],
      limit: 7,
    });
  }

  res.json(allAlbums);
});

router.get("/:id", async (req, res) => {
  const album = await Album.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      { model: Song, attributes: ["title", "length", "track_number"] },
      { model: Artist, attributes: ["title"], as: "artist" },
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
