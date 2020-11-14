const express = require("express");
const router = express.Router();

const { client } = require("../elasticsearch/index");

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
  console.log(req.params.index);
  try {
    const {
      body: { hits: results },
    } = await queryFromElastic([req.params.index], req.query.search);

    console.log(results);
    if (results.hits[0])
      res.json({
        success: true,
        content: [
          results.hits.map((hit) => {
            return {
              data: hit._source,
              type: hit._type,
            };
          }),
        ],
      });
    return res.json({ success: false, msg: "No results" }).status(404);
  } catch (e) {
    res.json({ success: false, msg: e.toString() });
  }
  //   res.json(results.body.hits.hits);
});

router.get("/", async (req, res) => {
  const searchQuery = req.query.search;
  try {
    const results = await Promise.all(
      ["songs", "albums", "artists", "playlists"].map((index) =>
        queryFromElastic(index, searchQuery, 3)
      )
    );
    res.json({
      success: true,
      content: results.map((res) =>
        res.body.hits.hits.map((hit) => {
          return {
            data: hit._source,
            type: hit._type,
          };
        })
      ),
    });
  } catch (e) {
    res.json({ success: false, msg: e.toString() });
  }
});

// router.get("/albums", async (req, res) => {
//   const results = await queryFromElastic(["albums"]);
//   res.json(results.body.hits.hits);
// });

// router.get("/artists", async (req, res) => {
//   const results = await queryFromElastic(["artists"]);
//   res.json(results.body.hits.hits);
// });

// router.get("/playlists", async (req, res) => {
//   const results = await queryFromElastic(["playlists"]);
//   res.json(results.body.hits.hits);
// });

function queryFromElastic(indexes, userQuery, size = 20) {
  try {
    console.log(userQuery.split(" ").join("* "));
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
              // operator: "or",
              // minimum_should_match: 1,
            },
          },
        },
      },
      size: size,
    });
  } catch (e) {
    return res.json({ success: false, msg: e.toString() });
  }
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
