"use strict";

// Route for users

const express = require("express");
const { BadRequestError } = require("../expressError.js");

// Models
const User = require("../models/user.js");
const { createToken } = require("../helper/token.js");
const Movie = require("../models/movie.js");
const TV = require("../models/tvshow.js");

// Schemas
const jsonschema = require("jsonschema");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

// Middleware for Admin or Current User setup
const {
  ensureAdmin,
  ensureCorrectUserOrAdmin,
} = require("../middleware/auth.js");

const router = express.Router();

// POST / - Required Admin
router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (e) {
    return next(e);
  }
});

// GET / - Required Admin
router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

// GET /[username] - Required Current User or Admin
router.get("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

// PATCH /[username] - Required Current User or Admin
router.patch("/:username", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

// DELETE /[username] - Required Current User or Admin
router.delete(
  "/:username",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (e) {
      return next(e);
    }
  }
);

// Note: You need to make function in /models/user.js first
// READ ABOVE BEFORE YOU DO THIS BELOW!

// POST /[username]/movies/[movie_id] - Required Admin or Current User
router.post(
  "/:username/movies/:movie_id",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.add_movie(req.params.username, req.params.movie_id);
      return res.json({ added: req.params.movie_id });
    } catch (e) {
      return next(e);
    }
  }
);

// DELETE /[username]/movies/[movie_id] - Required Admin or Current User
router.delete(
  "/:username/movies/:movie_id",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.remove_movie(req.params.username, req.params.movie_id);
      return res.json({ deleted: req.params.movie_id });
    } catch (e) {
      return next(e);
    }
  }
);
// POST /[username]/tvshows/[tvshow_id] - Required Admin or Current User
router.post(
  "/:username/tvshows/:tvshow_id",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.add_tv(req.params.username, req.params.tvshow_id);
      return res.json({ added: req.params.tvshow_id });
    } catch (e) {
      return next(e);
    }
  }
);
// DELETE /[username]/tvshows/[tvshow_id] - Required Admin or Current User
router.delete(
  "/:username/tvshows/:tvshow_id",
  ensureCorrectUserOrAdmin,
  async (req, res, next) => {
    try {
      await User.remove_tv(req.params.username, req.params.tvshow_id);
      return res.json({ deleted: req.params.tvshow_id });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
