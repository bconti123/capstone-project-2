"use strict";

// Route for movies.
const Movie = require("../models/movie.js");
const mediaAPI = require("../helper/api.js");
const express = require("express");
const { BadRequestError } = require("../expressError.js");

const router = express.Router();

// GET /
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json({ movies });
  } catch (e) {
    return next(e);
  }
});

// POST /
router.post("/", async (req, res, next) => {
  try {
    const movie = await Movie.add(req.body);
    return res.status(201).json({ movie });
  } catch (e) {
    return next(e);
  }
});

// GET /[movie_id]
router.get("/:movie_id", async (req, res, next) => {
  try {
    const movie = await Movie.get(req.params.movie_id);
    return res.status(200).json({ movie });
  } catch (e) {
    return next(e);
  }
});

// GET /[filterType]/[page?]
// filterType: popular, now_playing, top_rated, or upcoming
router.get("/list/:filterType/:page?", async (req, res, next) => {
  try {
    const movies = await mediaAPI.MediaTypeList(
      "movie",
      req.params.filterType,
      req.params.page
    );
    return res.status(200).json({ movies: movies.data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
