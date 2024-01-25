"use strict";

const request = require("supertest");
const app = require("../app.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// GET /tvshows
describe("GET /tvshows", () => {
  test("works", async () => {
    const resp = await request(app).get("/tvshows");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      tvshows: [
        {
          id: 1,
          name: "tv1",
          overview: "overview1",
          first_air_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
        {
          id: 2,
          name: "tv2",
          overview: "overview2",
          first_air_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
        {
          id: 3,
          name: "tv3",
          overview: "overview3",
          first_air_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
      ],
    });
  });
});

// POST /tvshows
describe("POST /tvshows", () => {
  test("works", async () => {
    const resp = await request(app)
      .post("/tvshows")
      .send({
        id: 4,
        name: "new",
        overview: "new",
        first_air_date: "Jan 01, 2021",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      });
    expect(resp.status).toEqual(201);
    expect(resp.body).toEqual({
      tvshow: {
        id: 4,
        name: "new",
        overview: "new",
        first_air_date: "Jan 01, 2021",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      },
    });
  });
  test("bad request with dup tvshow id", async () => {
    const resp = await request(app)
      .post("/tvshows")
      .send({
        id: 1,
        name: "tv1",
        overview: "overview1",
        first_air_date: "Jan 01, 2020",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      });
    expect(resp.status).toEqual(400);
  });
});

// GET /tvshows/[tvshow_id]
describe("GET /tvshows/:tvshow_id", () => {
  test("works", async () => {
    const resp = await request(app).get("/tvshows/1");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      tvshow: {
        id: 1,
        name: "tv1",
        overview: "overview1",
        first_air_date: "Jan 01, 2020",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      },
    });
  });
  test("tv show is not found", async () => {
    const resp = await request(app).get("/tvshows/0");
    expect(resp.status).toEqual(404);
  });
});

// GET /tvshows/list/[filterType]/[page?]
describe("GET /tvshows/list/:filterType/:page?", () => {
  test("works: popular", async () => {
    const resp = await request(app).get("/tvshows/list/popular");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });

  test("works: airing_today", async () => {
    const resp = await request(app).get("/tvshows/list/airing_today");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works: on_the_air", async () => {
    const resp = await request(app).get("/tvshows/list/on_the_air");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works: top_rated", async () => {
    const resp = await request(app).get("/tvshows/list/top_rated");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works with page number", async () => {
    const resp = await request(app).get("/tvshows/list/popular/2");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
});
