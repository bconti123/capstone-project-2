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
});

// GET /

// GET /[username]

// PATCH /[username]

// DELETE /[username]

// POST /[username]/movies/[movie_id]

// DELETE /[username]/movies/[movie_id]

// POST /[username]/tvshows/[tvshow_id]

// DELETE /[username]/tvshows/[tvshow_id]
