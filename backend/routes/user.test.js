"use strict";

const request = require("supertest");
const db = require("../db.js");
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
  adminToken,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// POST /

describe("POST /users", () => {
  test("works for admin: create non admin", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        password: "u-password",
        firstName: "u-first",
        lastName: "u-last",
        email: "u-email@gmail.com",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${adminToken}`);

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

  test("works for admin: create admin", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        password: "u-password",
        firstName: "u-first",
        lastName: "u-last",
        email: "u-email@gmail.com",
        isAdmin: true,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
  });

  test("unauth for users", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        password: "u-password",
        firstName: "u-first",
        lastName: "u-last",
        email: "u-email@gmail.com",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async () => {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "u-password",
      firstName: "u-first",
      lastName: "u-last",
      email: "u-email@gmail.com",
      isAdmin: false,
    });

    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async () => {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        password: "u-password",
        firstName: "u-first",
        lastName: "u-last",
        email: "not-a-email",
        isAdmin: false,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

// GET /
describe("GET /users", () => {
  test("works for admin", async () => {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
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

  test("unauth for users", async () => {
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async () => {
    const resp = await request(app).get("/users");

    expect(resp.statusCode).toEqual(401);
  });

  test("fails: test next() handler", async function () {
    await db.query("DROP TABLE users CASCADE");
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(500);
  });
});

// GET /[username]
describe("GET /:username", () => {
  test("works for admin", async () => {
    const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "u1F",
        lastName: "u1L",
        email: "u1@gmail.com",
        isAdmin: false,
        movie_list: [1],
        tvshow_list: [1],
      },
    });
  });
  test("works for correct user", async () => {
    const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "u1F",
        lastName: "u1L",
        email: "u1@gmail.com",
        isAdmin: false,
        movie_list: [1],
        tvshow_list: [1],
      },
    });
  });

  test("unauth for other users", async () => {
    const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async () => {
    const resp = await request(app).get("/users/u1");

    expect(resp.statusCode).toEqual(401);
  });

  test("user is not found", async () => {
    const resp = await request(app)
      .get("/users/nope")
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});

// PATCH /[username]
describe("PATCH /:username", () => {
  test("works for admin", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .send({
        firstName: "Updateu1F",
        lastName: "Updateu1L",
        email: "Updateu1@gmail.com",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "Updateu1F",
        lastName: "Updateu1L",
        email: "Updateu1@gmail.com",
        isAdmin: false,
      },
    });
  });
  test("works for correct user", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .send({
        firstName: "Updateu1F",
        lastName: "Updateu1L",
        email: "Updateu1@gmail.com",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "Updateu1F",
        lastName: "Updateu1L",
        email: "Updateu1@gmail.com",
        isAdmin: false,
      },
    });
  });
  test("Set Password works", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .send({
        password: "update",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(200);
  });
  test("unauth for other users", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .set("authorization", `Bearer ${u2Token}`);

    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async () => {
    const resp = await request(app).patch("/users/u1");

    expect(resp.statusCode).toEqual(401);
  });
  test("user is not found", async () => {
    const resp = await request(app)
      .patch("/users/nope")
      .send({
        firstName: "nothing",
      })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if missing data", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(400);
  });
  test("bad request if invalid data", async () => {
    const resp = await request(app)
      .patch("/users/u1")
      .send({ email: "not-a-email" })
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(400);
  });
});

// DELETE /[username]
describe("DELETE /:username", () => {
  test("works for admin", async () => {
    const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("works for correct user", async () => {
    const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unath for other users", async () => {
    const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${u2Token}`);

    expect(resp.statusCode).toEqual(401);
  });

  test("unath for anon users", async () => {
    const resp = await request(app).delete("/users/u1");

    expect(resp.statusCode).toEqual(401);
  });

  test("user is not found", async () => {
    const resp = await request(app)
      .delete("/users/nope")
      .set("authorization", `Bearer ${adminToken}`);

    expect(resp.statusCode).toEqual(404);
  });
});

// POST /[username]/movies/[movie_id]

// DELETE /[username]/movies/[movie_id]

// POST /[username]/tvshows/[tvshow_id]

// DELETE /[username]/tvshows/[tvshow_id]
