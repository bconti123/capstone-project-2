"use strict";

const db = require("../db.js");
// User/Auth
const User = require("../models/user.js");
const { createToken } = require("../helper/token.js");

// Movies
const Movie = require("../models/movie.js");
// TV Series
const TV = require("../models/tvshow.js");

// Create makeup users, movies, and tv series in commonBeforeAll function.
const commonBeforeAll = async () => {
  await db.query(`DELETE FROM users RETURNING username`);
  await db.query(`DELETE FROM movies RETURNING id`);
  await db.query(`DELETE FROM tv_shows RETURNING id`);

  await User.register({
    username: "u1",
    firstName: "u1F",
    lastName: "u1L",
    email: "u1@gmail.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "u2F",
    lastName: "u2L",
    email: "u2@gmail.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "u3F",
    lastName: "u3L",
    email: "u3@gmail.com",
    password: "password3",
    isAdmin: false,
  });
};

const commonBeforeEach = async () => {
  await db.query("BEGIN");
};

const commonAfterEach = async () => {
  await db.query("ROLLBACK");
};

const commonAfterAll = async () => {
  await db.end();
};

const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
