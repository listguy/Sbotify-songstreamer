const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT;

// const { songs, albums, artists, playlists } = require("./routes/index");
const songs = require("./routes/songs");
const albums = require("./routes/albums");
const artists = require("./routes/artists");
//Creating a connection to MySQL
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nitzosql",
  database: "songstreamer",
});

database.connect((e) => {
  if (e) return console.log("Fail", e);
  console.log("sucsess");
});

const app = express();
app.use(express.json());

app.use("/songs", songs); //Use songs.js file to handle /songs entrypoints.

app.use("/albums", albums);

app.use("/artists", artists);

app.get("/top/:pType", (req, res) => {
  const type = req.params.pType.slice(0, -1);
  const limit = req.query.limit || 5;
  const filterBy = req.query.filter;
  const id = req.query.id;

  const sql =
    type === "song"
      ? `SELECT a.*, b.title AS album FROM ${type}s a 
        INNER JOIN albums b 
            ON a.album_id = b.album_id
        ${filterBy && id ? `WHERE a.${filterBy}_id=${Number(id)}` : ``} 
        ORDER BY -views LIMIT ${limit}`
      : `SELECT a.* FROM ${type}s a 
      INNER JOIN songs s ON ${
        type === "playlist"
          ? `s.song_id = ANY(SELECT song_id FROM songsinplaylist WHERE playlist_id = a.playlist_id)`
          : `a.${type}_id = s.${type}_id`
      }
      GROUP BY ${type}_id 
      ${filterBy && id ? `HAVING ${filterBy}_id=${Number(id)}` : ``}
      ORDER BY -SUM(s.views)
      LIMIT ${limit}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/watch/playlist/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Playlists WHERE playlist_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).json(e);

    database.query(
      `SELECT a.* , b.title AS artist_name, b.media AS artist_cover, c.title AS album_name FROM songs a
      INNER JOIN artists b
            ON a.artist_id = b.artist_id
      INNER JOIN albums c
            ON a.album_id = c.album_id 
      WHERE song_id = ANY(
        SELECT song_id FROM songsinplaylist 
        WHERE playlist_id = ${id})
      `,
      (e, songsRes) => {
        if (e) res.status(400).json(e);
        let artist_details = [
          ...new Set(
            songsRes
              .map((s) => [s.artist_name, s.artist_cover, s.artist_id])
              .flat()
          ),
        ];
        let artists = [];
        for (let i = 0; i < artist_details.length - 2; i += 3) {
          artists.push([
            artist_details[i],
            artist_details[i + 1],
            artist_details[i + 2],
          ]);
        }

        result[0].artists = artists;
        result[0].songs = songsRes;
        res.json(result);
      }
    );
  });
});

app.get("/watch/:type/:id", (req, res) => {
  const { type, id } = req.params;

  const sql = `SELECT a.*${
    type !== "artist" ? `, b.title AS artist_name` : ``
  } ${type === "song" ? `, c.title AS album_name` : ``}
  FROM ${type}s a
  ${
    type !== "artist"
      ? `INNER JOIN artists b
  ON a.artist_id = b.artist_id`
      : ``
  }
  ${
    type === "song"
      ? `INNER JOIN albums c
  ON a.album_id = c.album_id`
      : ``
  }
  WHERE a.${type}_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) return res.status(404).json(e);
    //Increment views if is song
    if (type === "song") {
      database.query(
        `UPDATE Songs SET views = ${result[0].views + 1} WHERE song_id = ${id}`
      );
    }
    res.json(result[0]);
  });
});

app.post("/:type", (req, res) => {
  const data = req.body;
  const type = req.params.type;
  const sql = `INSERT INTO ${type}s SET ?`;

  database.query(sql, data, (e, result) => {
    if (e) res.json(e).status(400);
    res.json(result);
  });
});

app.patch("/:type/:id", (req, res) => {
  const type = req.params.type;
  const id = req.params.id;

  const values = Object.entries(req.body)
    .map(
      (entry) =>
        `${entry[0]}=${Number.isInteger(entry[1]) ? entry[1] : `'${entry[1]}'`}`
    )
    .join(", ");

  const sql = `UPDATE ${type}s 
  SET ${values}
  WHERE ${type}_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e)
      return res
        .status(400)
        .send(
          "Bad request. Check all your columns exist in table and have proper values."
        );
    res.json(result);
  });
});

app.delete("/:type/:id", (req, res) => {
  const type = req.params.type;
  const id = req.params.id;

  const sql = `DELETE FROM ${type}s WHERE ${type}_id=${id}`;

  database.query(sql, (e, result) => {
    res.status(204).end();
  });
});

app.get("/api/search-sbotify/:query", (req, res) => {
  const query = req.params.query;
  const sql = `SELECT song_id AS id,title, 'song' AS type FROM Songs
  WHERE title REGEXP '^${query}'
  UNION ALL
  SELECT album_id, title, 'album' FROM Albums
  WHERE title REGEXP '^${query}'
  UNION ALL
  SELECT artist_id, title, 'artist' FROM Artists
  WHERE title REGEXP '^${query}'
  UNION ALL
  SELECT playlist_id, title, 'playlist' FROM Playlists
  WHERE title REGEXP '^${query}'
   `;

  database.query(sql, (e, result) => {
    if (e) res.json("Check your connection");
    res.json(result);
  });
});

app.get("/api/get_all/:table", (req, res) => {
  const { filter, id, order, limit, offset } = req.query;
  const { table } = req.params;

  const sql = `SELECT * FROM ${table} ${
    filter && id ? `WHERE ${filter}_id=${id} ` : ``
  }${order ? `ORDER BY ${order}` : ``}
  ${limit ? `LIMIT ${offset * 20},${limit}` : ``}`;

  database.query(sql, (e, result) => {
    if (e) return res.json(400);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

//#region Old entry point using pug
// app.get("/watch/song/:id", (req, res) => {
//   const reg = new RegExp(".+w");
//   const id = reg.test(req.params.id)
//     ? req.params.id.slice(0, -1)
//     : req.params.id;

//   const sql = `SELECT s.*, a.title AS artist_name, al.title AS album_name
//   FROM songstreamer.songs s
//   INNER JOIN songstreamer.artists a
//     ON s.artist_id = a.artist_id
//   INNER JOIN songstreamer.albums al
//     ON s.album_id = al.album_id
//   WHERE s.song_id = ${id}`;
//   database.query(sql, (e, result) => {
//     if (e) return res.status(404).json(e);
//     if (!result[0]) return res.status(404).send("no Such Song:/");

//     result = result[0];

//     if (!reg.test(req.params.id)) return res.json(result);

//     database.query(
//       `UPDATE Songs SET views = ${result.views + 1} WHERE song_id = ${id}`
//     );

//     res.render("index", {
//       title: "Sbotify",
//       header: `${result.title}`,
//       subheader: `From: ${result.album_name}, By: ${result.artist_name}`,
//       details: `length: ${Math.floor(result.length / 60)}:${
//         result.length % 60
//       }, release date: ${result.created_at.toISOString().substring(0, 10)}`,
//       link: result.media.replace("watch?v=", "embed/"),
//     });
//   });
// });

// app.get("/album/:id", (req, res) => {
//   const reg = new RegExp(".+w");
//   const id = reg.test(req.params.id)
//     ? req.params.id.slice(0, -1)
//     : req.params.id;

//   const sql = `SELECT al.*, ar.title AS artist_name
//   FROM songstreamer.albums al
//   INNER JOIN songstreamer.artists ar
//     ON al.artist_id = ar.artist_id
//   WHERE al.album_id = ${id}`;

//   database.query(sql, (e, result) => {
//     if (e) return res.status(404).json(e);
//     if (!result[0]) res.status(400).send("no such album :/");

//     result = result[0];

//     if (!reg.test(req.params.id)) return res.json(result);

//     res.render("index", {
//       title: "Sbotify",
//       header: `${result.title}`,
//       subheader: `By: ${result.artist_name}`,
//       details: `release date: ${result.created_at
//         .toISOString()
//         .substring(0, 10)}`,
//       link: result.media,
//     });
//   });
// });

// app.get("/artist/:id", (req, res) => {
//   const reg = new RegExp(".+w");
//   const id = reg.test(req.params.id)
//     ? req.params.id.slice(0, -1)
//     : req.params.id;
//   const sql = `SELECT * FROM Artists WHERE artist_id = ${id}`;

//   database.query(sql, (e, result) => {
//     if (e) return res.status(404).json(e);
//     if (!result[0]) res.status(400).send("no such artist :/");

//     result = result[0];

//     if (!reg.test(req.params.id)) return res.json(result);

//     res.render("index", {
//       title: "Sbotify",
//       header: `${result.title}`,
//       link: result.media,
//     });
//   });
// });

// app.get("/playlist/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = `SELECT * FROM Playlists WHERE playlist_id = ${id}`;

//   database.query(sql, (e, result) => {
//     if (e) res.status(404).json(e);

//     database.query(
//       `SELECT * FROM songs WHERE song_id = ANY(SELECT song_id FROM songsinplaylist WHERE playlist_id = ${id})`,
//       (e, songsRes) => {
//         if (e) res.status(400).json(e);
//         result[0].songs = songsRes;
//         res.json(result);
//       }
//     );
//   });
// });
//#endregion
