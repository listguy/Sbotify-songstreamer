const app = require("../app");
const request = require("supertest");
const { Artist } = require("../models");
const { post } = require("../app");

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

    const addedArtist = await Artist.findByPk(body[0].id);

    expect(addedArtist.title).toBe(body[0].title);
  });

  it("Can get all artists and artist by ID", async () => {
    await request(app).post("/artists").send([fakeArtist, fakeArtist2]);

    const { body: allArtists } = await request(app).get("/artists");
    const { body: secondArtist } = await request(app).get("/artists/2");

    expect(allArtists[0].title).toBe(fakeArtist.title);
    expect(allArtists[1].title).toBe(fakeArtist2.title);
    expect(secondArtist.id).toBe(2);
  });

  it("Can update details", async () => {
    const { body: addedArtists } = await request(app)
      .post("/artists")
      .send([fakeArtist]);

    const newTitle = "updated title";

    const { body: updatedRes } = await request(app)
      .put(`/artists/${addedArtists[0].id}`)
      .send({ title: newTitle });

    const { body: updatedArtist } = await request(app).get(
      `/artists/${addedArtists[0].id}`
    );

    expect(updatedRes.sucsess).toBe(true);
    expect(updatedArtist.title).toBe(newTitle);
  });

  it("Can soft delete artist", async () => {
    //Posting 2 artists
    const { body: allArtists } = await request(app)
      .post("/artists")
      .send([fakeArtist, fakeArtist2]);

    //Deleting the first artist
    await request(app).delete(`/artists/${allArtists[0].id}`);

    //Checking first artist was deleted
    const { body: firstArtistAfterDelete } = await request(app).get(
      `/artists/${allArtists[0].id}`
    );
    expect(firstArtistAfterDelete).toEqual(null);

    //Checking second artist remains unaffected (confirm that entry point deletes only the given id)
    const { body: secondArtistAfterDelete } = await request(app).get(
      `/artists/${allArtists[1].id}`
    );
    expect(secondArtistAfterDelete.title).toBe(allArtists[1].title);
  });
});
