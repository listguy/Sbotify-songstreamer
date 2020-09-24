const app = require("../app");
const request = require("supertest");
const { Song } = require("../models");

const fakeSong = {
  albumId: 1,
  artistId: 1,
  title: "test",
  media: "a//:example",
  trackNumber: 2,
  length: 123,
  views: 0,
  createdAt: "2020-01-01",
};

describe("Songs test", () => {
  beforeEach(async () => {
    await Song.destroy({ truncate: true, force: true });
  });

  it("can add song", async () => {
    const { body } = await request(app).post("/songs").send(fakeSong);
    console.log(body);
    expect(body.title).toBe(fakeSong.title);
  });

  it("can get song", async () => {
    const { body } = await request(app).get("/songs/2");
    console.log(body.title).toBe(fakeSong.title);
  });
});
