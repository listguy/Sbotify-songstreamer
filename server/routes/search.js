const express = require("express");
const router = express.Router();

const client = require("../elasticsearch/index");
const searchResponseMaxSize = 20;

// router.get("/update", async (req, res) => {
//   try {
//     const results = await client.search({
//       index: "artists",
//       body: {
//         query: {
//           match: {
//             id: {
//               query: 6,
//             },
//           },
//         },
//       },
//     });
//     res.json(results);
//   } catch (e) {
//     res.send(e);
//   }
// });

router.get("/:index", async (req, res) => {
  try {
    const {
      body: { hits: results },
    } = await queryFromElastic([req.params.index], req.query.search);

    if (results.hits[0])
      return res.json(results.hits.map((hit) => hit._source));
    return res.send("No results").status(404);
  } catch (e) {
    res.send(e);
  }
  //   res.json(results.body.hits.hits);
});

router.get("/", async (req, res) => {
  try {
    const {
      body: { hits: results },
    } = await queryFromElastic(
      ["songs", "albums", "artists", "playlists"],
      req.query.search
    );
    if (results.hits[0])
      return res.json(results.hits.map((hit) => hit._source));
    return res.send("No results").status(404);
  } catch (e) {
    res.send(e);
  }
});

router.get("/albums", async (req, res) => {
  const results = await queryFromElastic(["albums"]);
  res.json(results.body.hits.hits);
});

router.get("/artists", async (req, res) => {
  const results = await queryFromElastic(["artists"]);
  res.json(results.body.hits.hits);
});

router.get("/playlists", async (req, res) => {
  const results = await queryFromElastic(["playlists"]);
  res.json(results.body.hits.hits);
});

function queryFromElastic(indexes, userQuery) {
  return client.search({
    index: indexes,
    body: {
      query: {
        regexp: {
          title: {
            value: `.*${userQuery}.*`,
            flags: "all",
            // sensitive: true,
            // max_determinized_states: 10000,
            // rewrite: "constant_score",
          },
        },
      },
    },
    size: searchResponseMaxSize,
  });
}

// router.get("/playlist", async (req, res) => {
//   const songs = await Playlist.findAll({
//     // include: [
//     //   {
//     //     model: Artist,
//     //     attributes: ["title"],
//     //   },
//     //   {
//     //     model: Album,
//     //     attributes: ["title"],
//     //   },
//     // ],
//     attributes: ["title", "id", "media"],
//   });
//   //   res.json(songs);
//   const body = songs.flatMap((doc) => [
//     { index: { _index: "playlists", _type: "playlist" } },
//     doc,
//   ]);
//   const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//   if (bulkResponse.errors) {
//     return res.json(bulkResponse.errors);
//   }
//   const { body: count } = await client.count({ index: "playlists" });
//   res.send(count);
// });

module.exports = router;
// module.exports = client; //export connection
