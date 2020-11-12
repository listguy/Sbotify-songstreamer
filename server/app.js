const express = require("express");
const { Artist, Album, Song, Playlist } = require("./models");
const { Op } = require("sequelize");

// const { songs, albums, artists, playlists } = require("./routes/index");
const songs = require("./routes/songs");
const albums = require("./routes/albums");
const artists = require("./routes/artists");
const playlists = require("./routes/playlists");
const user = require("./routes/user");
const searches = require("./routes/search");

//Require auth middleware
const tokenCheck = require("./middleware/verifyToken").auth;

const app = express();
app.use(express.json());

app.use("/user", user);

app.use("/songs", songs); //Use songs.js file to handle /songs entrypoints.

app.use("/albums", tokenCheck, albums);

app.use("/artists", tokenCheck, artists);

app.use("/playlists", tokenCheck, playlists);

app.use("/search", searches);

app.get("/search", async (req, res) => {
  const { query } = req.query;
  const options = {
    attributes: ["id", "title"],
    where: {
      title: {
        [Op.regexp]: `^${query}`,
      },
    },
  };
  const types = ["artist", "album", "song", "playlist"];
  const matchedResults = await Promise.all([
    Artist.findAll(options),
    Album.findAll(options),
    Song.findAll(options),
    Playlist.findAll(options),
  ]);

  matchedResults.map((matchedArr, i) =>
    matchedArr.map((result) => (result.dataValues.type = types[i])).flat()
  );

  res.json(matchedResults.flat());
});

module.exports = app;
