"use strict";

//  Middleware handle common auth cases in routes

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.js");
const { UnauthorizedError } = require("../expressError.js");

/** Middleware: Authenticate user.
 *
 *  If a token was provided, verify it, and, if valid, store the
 *  token payload on res.locals (this will include the username
 *  and isAdmin field.)
 *
 *  Throws UnauthorizedError if:
 *  - No token provided
 *  - invalid token
 *  - no matching user
 *
 *  Calls next() if otherwise.
 *
 * */

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      const payload = jwt.verify(token, SECRET_KEY);
      res.locals.user = payload;
    }
    return next();
  } catch (err) {
    return next();
  }
};

/** Middleware to ensure user is logged in.
 *
 *  Calls next() if otherwise.
 *
 */

const ensureLoggedIn = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware to ensure user is admin.
 *
 *  Calls next() if otherwise.
 *
 */
const ensureAdmin = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    if (!res.locals.user.isAdmin) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware to ensure user is correct user or admin.
 *
 *  Calls next() if otherwise.
 *
 */
const ensureCorrectUserOrAdmin = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    if (
      res.locals.user.username !== req.params.username &&
      !res.locals.user.isAdmin
    )
      throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
};
