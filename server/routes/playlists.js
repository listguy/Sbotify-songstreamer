const express = require("express");
const {
  Playlist,
  Song,
  Album,
  Artist,
  SongsInPlaylists,
} = require("../models");
const { Op } = require("sequelize");
let router = express.Router();

router.get("/", async (req, res) => {
  const { limit = 100000, order = "ASC" } = req.query;

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

  const songs = await Playlist.findAll({
    include: [{ model: Song, attributes: ["views"] }],
    attributes: ["id"],
    limit: limit,
  });

  let combined = [];
  for (let i = 0; i < songs.length; i++) {
    let counterViews = 0;
    songs[i].toJSON().Songs.forEach((obj) => (counterViews += obj.views));
    topPlaylists[i].dataValues.views = counterViews;
    combined.push(topPlaylists[i]);
  }
  combined = combined.sort((a, b) => {
    return a.toJSON().views - b.toJSON().views;
  });
  res.json(combined.reverse());
  // res.json(topPlaylists);
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

//need to improve below methods, so child are affected too.
router.post("/", async (req, res) => {
  const { body } = req;

  body.uploadedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const newPlaylist = await Playlist.create(body, {
      fields: ["title", "media", "uploadedAt"],
    });

    const newId = newPlaylist.id;
    const playlistSongs = body.songs.map((song) => {
      song.playlistId = newId;
      return song;
    }); //Adding the new playlists id to all songs objects

    const songs = await SongsInPlaylists.bulkCreate(playlistSongs, {
      fields: ["songId", "playlistId"],
    });

    newPlaylist.songs = songs; //Not working
    res.json(newPlaylist);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: "Malformed data" });
  }
});

router.put("/:id", async (req, res) => {
  const fields = req.body;

  updatedPlaylist = await Playlist.update(fields, {
    where: {
      id: req.params.id,
    },
  });

  res.json(updatedPlaylist);
});

router.delete("/:id", async (req, res) => {
  await Playlist.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).end();
});

router.delete("/:id/hardDelete", async (req, res) => {
  await Playlist.destroy({
    where: {
      id: req.params.id,
    },
    force: true,
  });

  res.send("Deleted permanatly");
});

module.exports = router;
