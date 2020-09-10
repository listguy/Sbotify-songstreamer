const express = require("express");
const mysql = require("mysql");
const PORT = 3001;
// const path = require("path");
// const singlePagePath = "/singlePage.html";

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

//
app.set("views", "./views");
app.set("view engine", "pug");
//

app.get("/top_songs", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 3`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_albums", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 3`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_artists", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 3`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_playlists", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 3`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/song/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Songs WHERE song_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.json("Mal info. Check id");

    database.query(sql, (e, result) => {
      if (e) res.status(404).json(e);
      if (!req.query.watch === "yes") res.json(result);

      res.render("index", {
        title: "Sbotify",
        header: `${result[0].title}`,
        subheader: `By: ${result[0].artist_id}`,
        link: result[0].media.replace("watch?v=", "embed/"),
      });
    });
  });
});

app.get("/album/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Albums WHERE album_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).json(e);
    res.json(result);
  });
});

app.get("/artist/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Artists WHERE artist_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).json(e);
    res.json(result);
  });
});

app.get("/playlist/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Playlists WHERE playlist_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).json(e);
    res.json(result);
  });
});

app.post("/song", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Songs SET ?`;

  database.query(sql, data, (e, result) => {
    if (e) res.json(e);
    res.json(result);
  });
});

app.post("/album", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Albums SET ?`;

  database.query(sql, data, (e, result) => {
    if (e) res.json(e);
    res.json(result);
  });
});

app.post("/artist", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Artists SET ?`;

  database.query(sql, data, (e, result) => {
    if (e) res.json(e);
    res.json(result);
  });
});

app.post("/playlist", (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Playlists SET ?`;

  database.query(sql, data, (e, result) => {
    if (e) res.json(e);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

function createPage() {
  const newWindow = window.open("");
  newWindow.document.write(
    "<html><head><title>MyTitle</title></head><body>test</body></html>"
  );
  return newWindow;
}

// function getTop20(table) {
//   const sql = `SELECT * FROM ${table} LIMIT 20`;

//   database
//     .query(sql, (e, result) => {
//       if (e) return e;
//       return result;
//     })
//     .then((result) => result)
//     .catch((e) => e);
// }
