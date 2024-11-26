"use strict";

/** Express app for streaming service. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth.js");
// Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const movieRoutes = require("./routes/movie.js");
const tvRoutes = require("./routes/tvshow.js");

// app express setup
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;
// CORS Options
const corsOptions = {
  origin: FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// middleware
app.use(authenticateJWT);

// app.use Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use("/tvshows", tvRoutes);

// Server is running
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server is running" });
})

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
