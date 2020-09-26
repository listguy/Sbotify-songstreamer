const app = require("../app");
const request = require("supertest");
const { Artist } = require("../models");

const fakeArtist = {
  title: "fake man",
  media: "fake-img.jpg",
};

const fakeArtist2 = {
  title: "fake woman",
  media: "real-img.jpg",
};

describe("Artist test", () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it("can add an artist", async () => {
    const { body } = await request(app).post("/artists").send(fakeArtist);

    const addedArtist = await Artist.findByPk(body.id);

    expect(addedArtist.title).toBe(body.title);
  });

  it("Can get all artists and artist by ID", async () => {
    await request(app).post("/artists").send(fakeArtist);
    await request(app).post("/artists").send(fakeArtist2);

    const { body: allArtists } = await request(app).get("/artists");
    const { body: secondArtist } = await request(app).get("/artists/2");

    expect(allArtists[0].title).toBe(fakeArtist.title);
    expect(allArtists[1].title).toBe(fakeArtist2.title);
    expect(secondArtist.id).toBe(2);
  });

  it("Can update details", async () => {
    const { body: addedArtist } = await request(app)
      .post("/artists")
      .send(fakeArtist);
    const newTitle = "updated title";
    const { body: updated } = await request(app).put(`/artists/1`);
  });
});
