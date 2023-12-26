"use strict";

// Route for authentication

const User = require("../models/user.js");
const express = require("express");
const router = new express.Router();

const { createToken } = require("../helper/token.js");
const { BadRequestError } = require("../expressError.js");

const jsonschemas = require("jsonschema");
const userAuthSchema = require("../schemas/userAuth.json")
const userRegisterSchema = require("../schemas/userRegister.json")

// POST /auth/token
router.post("/token", async (req, res, next) => {
    try {
        const validator = jsonschemas.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (e) {
        return next(e);
    }

});
// POST /auth/register
router.post("/register", async (req, res, next) => {
    try {
        const validator = jsonschemas.validate( ...req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken({ token });
        return res.status(201).json({ token });
    } catch (e) {
        return next(e);
    }

});

module.exports = router;