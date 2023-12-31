"use strict";

const db = require("../db.js");
// User/Auth
const User = require("../models/user.js");
const { createToken } = require("../helper/token.js");

// Movies
const Movie = require("../models/movie.js");
// TV Series
const TV = require("../models/tvshow.js");

const testMovieids = [];
const testTVids = [];

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

  testMovieids[0] = (
    await Movie.add({
      id: 1,
      title: "movie1",
      overview: "overview1",
      release_date: "Jan 01, 2020",
      poster_path: "/img.png",
      genres_id: [1, 2, 3],
    })
  ).id;
  testMovieids[1] = (
    await Movie.add({
      id: 2,
      title: "movie2",
      overview: "overview2",
      release_date: "Jan 01, 2020",
      poster_path: "/img.png",
      genres_id: [1, 2, 3],
    })
  ).id;
  testMovieids[2] = (
    await Movie.add({
      id: 3,
      title: "movie3",
      overview: "overview3",
      release_date: "Jan 01, 2020",
      poster_path: "/img.png",
      genres_id: [1, 2, 3],
    })
  ).id;

  testTVids[0] = (
    await TV.add({
      id: 1,
      name: "tv1",
      overview: "overview1",
      first_air_date: "Jan 01, 2020",
      genres_id: [1, 2, 3],
    })
  ).id;
  testTVids[1] = (
    await TV.add({
      id: 2,
      name: "tv2",
      overview: "overview2",
      first_air_date: "Jan 01, 2020",
      genres_id: [1, 2, 3],
    })
  ).id;
  testTVids[2] = (
    await TV.add({
      id: 3,
      name: "tv3",
      overview: "overview3",
      first_air_date: "Jan 01, 2020",
      genres_id: [1, 2, 3],
    })
  ).id;

  await User.add_movie("u1", testMovieids[0]);
  await User.add_tv("u1", testTVids[0]);
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
const adminToken = createToken({ username: "admin", isAdmin: true });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  testMovieids,
  testTVids,
  adminToken,
};
