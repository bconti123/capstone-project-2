"use strict";

const request = require("supertest");

const app = require("../app.js");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  testMovieids,
  testTVids,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST /

describe("POST /users", () => {
  test("works", async () => {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "u-password",
      firstName: "u-first",
      lastName: "u-last",
      email: "u-email@gmail.com",
      isAdmin: false,
    });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
        firstName: "u-first",
        lastName: "u-last",
        email: "u-email@gmail.com",
        isAdmin: false,
      },
      token: expect.any(String),
    });
  });
  // Create Admin User - Do later
  // Unauth - Do later
  test("bad request if missing data", async () => {
    const resp = await request(app).post("/users").send({
      username: "u-new",
    });
    expect(resp.statusCode).toEqual(400);
  });
  test("bad request if invalid data", async () => {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "u-password",
      firstName: "u-first",
      lastName: "u-last",
      email: "not-a-email",
      isAdmin: false,
    });
    expect(resp.statusCode).toEqual(400);
  });
});

// GET /
describe("GET /users", () => {
  test("works", async () => {
    const resp = await request(app).get("/users");
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      users: [
        {
          username: "u1",
          firstName: "u1F",
          lastName: "u1L",
          email: "u1@gmail.com",
          isAdmin: false,
        },
        {
          username: "u2",
          firstName: "u2F",
          lastName: "u2L",
          email: "u2@gmail.com",
          isAdmin: false,
        },
        {
          username: "u3",
          firstName: "u3F",
          lastName: "u3L",
          email: "u3@gmail.com",
          isAdmin: false,
        },
      ],
    });
  });
  // Work on auth later
});
// GET /[username]
describe("GET /:username", () => {});

// PATCH /[username]

// DELETE /[username]

// POST /[username]/movies/[movie_id]

// DELETE /[username]/movies/[movie_id]

// POST /[username]/tvshows/[tvshow_id]

// DELETE /[username]/tvshows/[tvshow_id]
