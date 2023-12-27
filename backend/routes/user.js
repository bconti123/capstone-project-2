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

// Middleware for Admin or Current User setup (Not done yet)

const router = express.Router();

// POST / - Required Admin
router.post("/", async (req, res, next) => {
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
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

// GET /[username] - Required Current User or Admin
router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});

// PATCH /[username] - Required Current User or Admin
router.patch("/:username", async (req, res, next) => {
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
router.delete("/:username", async (req, res, next) => {
  try {
    await User.delete(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (e) {
    return next(e);
  }
});

// Note: You need to make function in /models/user.js first
// READ ABOVE BEFORE YOU DO THIS BELOW!

// POST /[username]/movies/[movie_id] - Required Current User

// DELETE /[username]/movies/[movie_id] - Required Current User

// POST /[username]/tvshows/[tvshow_id] - Required Current User

// DELETE /[username]/tvshows/[tvshow_id] - Required Current User
