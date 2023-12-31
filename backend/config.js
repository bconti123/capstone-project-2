"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
const getDatabaseUri = () => {
  return (process.env.NODE_ENV === "test")
      ? "streaming_service_test"
      : process.env.DATABASE_URL || "streaming_service";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;

console.log("Streaming Service Config:".green);
console.log("NODE_ENV:".yellow, process.env.NODE_ENV)
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("API KEY:".yellow, API_KEY);
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
  API_KEY,
  API_TOKEN
};