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

// POST /auth/token
describe("POST /auth/token", () => {
  test("works", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: "u1",
      password: "password1",
    });
    expect(resp.body).toEqual({
      token: expect.any(String),
    });
  });
});
