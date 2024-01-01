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

// GET /tvshows/[tvshow_id]

// GET /tvshows/list/[filterType]/[page?]
