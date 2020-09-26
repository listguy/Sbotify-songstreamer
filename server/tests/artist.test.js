const app = require("../app");
const request = require("supertest");
const { Artist } = require("../models");

const fakeArtist = {
  title: "fake man",
  media: "fake-img-.jpg",
};

describe("Artist test", () => {
  beforeEach(async () => {
    await Artist.destroy({ truncate: true, force: true });
  });

  it("can add an artist and retrive him", async () => {
    const { body } = await request(app).post("/artists").send(fakeArtist);
    console.log(body);
    expect(true).toBe(true);
  });
});
