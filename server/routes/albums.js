const express = require("express");
const { Song } = require("../models");
const { Album } = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10000000;

  const allAlbums = await Album.findAll({
    limit: Number(limit),
    include: Song,
  });
  res.json(allAlbums);
});

router.get("/:id", async (req, res) => {
  const album = await Album.findAll({
    where: {
      id: req.params.id,
    },
    include: Song,
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
