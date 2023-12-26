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

  test("unauth with wrong password", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: "u1",
      password: "wrongpassword",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: "u1",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async () => {
    const resp = await request(app).post("/auth/token").send({
      username: 123,
      password: "a number",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

// POST /auth/register

describe("POST /auth/register", () => {
  test("works", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "new",
      password: "newpassword",
      firstName: "first",
      lastName: "last",
      email: "newemail@gmail.com",
    });
    expect(resp.statusCode).toEqual(201);
  });

  test("bad request with missing data", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "new",
      password: "newpassword",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async () => {
    const resp = await request(app).post("/auth/register").send({
      username: "new",
      password: "newpassword",
      firstName: "first",
      lastName: "last",
      email: "not-a-email",
    });
    expect(resp.statusCode).toEqual(400);
  });

});
