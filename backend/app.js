"use strict";

/** Express app for streaming service. */

const express = require("express");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth.js");
// Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const movieRoutes = require("./routes/movie.js");
const tvRoutes = require("./routes/tvshow.js");

// app express setup
const app = express();
app.use(express.json());

// middleware
app.use(authenticateJWT);

// app.use Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/tvshows", tvRoutes);

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
