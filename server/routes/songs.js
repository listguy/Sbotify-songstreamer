const express = require("express");
const { Song, Album, Artist } = require("../models");
const { Op } = require("sequelize");
const { client, updateByInddexAndId } = require("../elasticsearch/index");
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
  let body = Array.isArray(req.body) ? req.body : [req.body];
  body = body.map((song) => {
    song.uploadedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
    return song;
  });

  try {
    const newSong = await Song.create(body, {
      fields: [
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

    const created = newSong.dataValues;
    client.index({
      index: "songs",
      body: {
        id: created.id,
        title: created.title,
        media: created.media,
        Artist: {
          title: created.Artist.title,
        },
        Album: {
          title: created.Album.title,
        },
      },
    });

    res.json(newSong);
  } catch (e) {
    res.status(400).send({ msg: "Malformed data" });
  }
});

router.put("/:id", async (req, res) => {
  const fields = req.body;
  const songId = req.params.id;

  try {
    updatedSong = await Song.update(fields, {
      where: {
        id: songId,
      },
      fields: [
        "title",
        "media",
        "artist_id",
        "album_id",
        "track_number",
        "length",
        "lyrics",
        "views",
      ],
    });

    //body of the elastic search update doc
    const elasticFieldsToUpdate = Object.entries(fields)
      .filter(([key, value]) =>
        ["title", "media", "Artist", "Album"].includes(key)
      )
      .reduce((doc, [key, value]) => {
        if (["Artist", "Album"].includes(key)) {
          doc[key] = { title: value };
        } else {
          doc[key] = value;
        }
        return doc;
      }, {});

    if (Object.keys(elasticFieldsToUpdate)[0]) {
      //get elastic id

      const status = await updateByInddexAndId(
        "songs",
        songId,
        elasticFieldsToUpdate
      );

      if (updatedSong[0] === 1 && status.success)
        return res.json({ sucsess: true });

      return res.json({ sucsess: false, e: status.msg });
    }
  } catch (e) {
    res.json({ success: false }).status(500);
  }
  //#region delete later
  // const {
  //   body: { hits: result },
  // } = await client.search({
  //   index: "songs",
  //   body: {
  //     query: {
  //       match: {
  //         id: {
  //           query: songId,
  //         },
  //       },
  //     },
  //   },
  // });
  // // res.json(result);
  // console.log(result.hits[0]._id);
  // const elasticId = result.hits[0]._id;

  // await client.update({
  //   index: "songs",
  //   id: elasticId,
  //   body: {
  //     doc: elasticFieldsToUpdate,
  //     // {
  //     //   title: "loko",
  //     //   media: "moko",
  //     //   Artist: { title: "koko" },
  //     //   Album: { title: "coco" },
  //     // },
  //   },
  // });
  //#endregion
});

router.delete("/:id", async (req, res) => {
  await Song.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

router.delete(":/id/hardDelete", async (req, res) => {
  await Artist.destroy({
    where: {
      id: req.params.id,
    },
    force: true,
  });

  res.send("Deleted permanatly");
});

module.exports = router;
