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

// POST /

// GET /

// GET /[username]

// PATCH /[username]

// DELETE /[username]

// POST /[username]/movies/[movie_id]

// DELETE /[username]/movies/[movie_id]

// POST /[username]/tvshows/[tvshow_id]

// DELETE /[username]/tvshows/[tvshow_id]