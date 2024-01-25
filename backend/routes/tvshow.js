"use strict";

// Route for tv shows.
const TV = require("../models/tvshow.js");
const mediaAPI = require("../helper/api.js");
const express = require("express");
const { BadRequestError } = require("../expressError.js");

const router = express.Router();

// GET /
router.get("/", async (req, res, next) => {
  try {
    const tvshows = await TV.findAll();
    return res.status(200).json({ tvshows });
  } catch (e) {
    return next(e);
  }
});

// POST /
router.post("/", async (req, res, next) => {
  try {
    const tvshow = await TV.add(req.body);
    return res.status(201).json({ tvshow });
  } catch (e) {
    return next(e);
  }
});

// GET /[tvshow_id]
router.get("/:tvshow_id", async (req, res, next) => {
  try {
    const tvshow = await TV.get(req.params.tvshow_id);
    return res.status(200).json({ tvshow });
  } catch (e) {
    return next(e);
  }
});

// GET /list/[filterType]/[page?]
// filterType = airing_today, on_the_air, popular, or top_rated
router.get("/list/:filterType/:page?", async (req, res, next) => {
  try {
    const tvshows = await mediaAPI.MediaTypeList(
      "tv",
      req.params.filterType,
      req.params.page
    );
    return res.status(200).json({ tvshows: tvshows.data });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
