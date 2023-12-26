"use strict";

/** Express app for streaming service. */

const express = require("express");

const { NotFoundError } = require("./expressError");

// Routes
const authRoutes = require("./routes/auth.js");

// app express setup 
const app = express();
app.use(express.json())

// app.use Routes
app.use('/auth', authRoutes);

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
