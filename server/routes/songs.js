const express = require("express");
const { Song, Album, Artist } = require("../models");
const { Op } = require("sequelize");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit, order = "ASC" } = Number(req.query) || 1000000;

  const allSongs = await Song.findAll({
    limit: limit,
    include: [
      {
        model: Album,
        attributes: ["title"],
      },
      {
        model: Artist,
        attributes: ["id", "title"],
      },
    ],
    order: [["title", order]],
  });

  res.json(allSongs);
});

router.get("/top", async (req, res) => {
  const limit = req.query.limit || 100000;

  const topSongs = await Song.findAll({
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
    order: [["views", "Desc"]],
  });
  res.json(topSongs);
});

router.get("/:id", async (req, res) => {
  const song = await Song.findByPk(req.params.id, {
    include: [
      {
        model: Album,
        attributes: ["id", "title"],
      },
      {
        model: Artist,
        attributes: ["id", "title", "media"],
      },
    ],
  });

  //increment views
  Song.update(
    { views: song.views + 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(song);
});

router.post("/", async (req, res) => {
  const { body } = req;

  body.uploadedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  //Not sure if necasary with paranoid:
  body.id =
    (
      await Song.findAll({
        where: {
          title: {
            [Op.ne]: null,
          },
        },
      })
    ).length + 1;
  try {
    const newSong = await Song.create(req.body, {
      fields: [
        "id",
        "albumId",
        "artistId",
        "title",
        "media",
        "trackNumber",
        "lyrics",
        "length",
        "views",
        "uploadedAt",
      ],
    });
    res.json(newSong);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Malformed data" });
  }
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
