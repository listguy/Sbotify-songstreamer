const express = require("express");
const mysql = require("mysql");
const PORT = 3001;

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

app.get("/top_songs", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 20`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_albums", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 20`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_artists", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 20`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/top_playlists", (req, res) => {
  const table = req.url.substring(5);
  const sql = `SELECT * FROM ${table} LIMIT 20`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).end();
    res.json(result);
  });
});

app.get("/song/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Songs WHERE song_id = ${id}`;

  database.query(sql, (e, result) => {
    if (e) res.status(404).json(e);
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

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
