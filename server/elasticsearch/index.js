const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: { id: process.env.ELASTIC_ID },
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
});

const updateByInddexAndId = async (index, id, body) => {
  try {
    const {
      body: { hits: result },
    } = await client.search({
      index: index,
      body: {
        query: {
          match: {
            id: {
              query: id,
            },
          },
        },
      },
    });

    const elasticId = result.hits[0]._id;

    await client.update({
      index: index,
      id: elasticId,
      body: {
        doc: body,
      },
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e };
  }
};

module.exports.client = client;
module.exports.updateByInddexAndId = updateByInddexAndId;
