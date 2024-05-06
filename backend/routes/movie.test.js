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

// GET /movies
describe("GET /movies", () => {
  test("works", async () => {
    const resp = await request(app).get("/movies");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      movies: [
        {
          id: 1,
          title: "movie1",
          overview: "overview1",
          release_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
        {
          id: 2,
          title: "movie2",
          overview: "overview2",
          release_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
        {
          id: 3,
          title: "movie3",
          overview: "overview3",
          release_date: "Jan 01, 2020",
          poster_path: "/img.png",
          genres_id: [1, 2, 3],
        },
      ],
    });
  });
});

// POST /movies
describe("POST /movies", () => {
  test("works", async () => {
    const resp = await request(app)
      .post("/movies")
      .send({
        id: 4,
        title: "new",
        overview: "newO",
        release_date: "December 31, 2023",
        poster_path: "/image.jpg",
        genres_id: [1, 2, 3],
      });
    expect(resp.status).toEqual(201);
    expect(resp.body).toEqual({
      movie: {
        id: 4,
        title: "new",
        overview: "newO",
        release_date: "December 31, 2023",
        poster_path: "/image.jpg",
        genres_id: [1, 2, 3],
      },
    });
  });
  test("bad request with dup movie id", async () => {
    const resp = await request(app)
      .post("/movies")
      .send({
        id: 1,
        title: "movie1",
        overview: "overview1",
        release_date: "Jan 01, 2020",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      });
    expect(resp.status).toEqual(400);
  });
});

// GET movies/[movie_id]
describe("GET /movies/:movie_id", () => {
  test("works", async () => {
    const resp = await request(app).get("/movies/1");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      movie: {
        id: 1,
        title: "movie1",
        overview: "overview1",
        release_date: "Jan 01, 2020",
        poster_path: "/img.png",
        genres_id: [1, 2, 3],
      },
    });
  });
  test("movie is not found", async () => {
    const resp = await request(app).get("/movies/0");
    expect(resp.status).toEqual(404);
  });
});


// GET /movies/list/[filterType]/[page?]
describe("GET /movies/api/:filterType/:page?", () => {
  test("works: popular", async () => {
    const resp = await request(app).get("/movies/list/popular");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });

  test("works: now_playing", async () => {
    const resp = await request(app).get("/movies/list/now_playing");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works: upcoming", async () => {
    const resp = await request(app).get("/movies/list/upcoming");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works: top_rated", async () => {
    const resp = await request(app).get("/movies/list/top_rated");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
  test("works with page number", async () => {
    const resp = await request(app).get("/movies/list/popular/2");
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual(expect.any(Object));
  });
});

// GET /movies/trending/[period]

