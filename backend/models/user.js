"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helper/sql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username, 
                    password, 
                    first_name AS "firstName",
                    last_name AS "lastName",
                    Email AS "email",
                    is_admin AS "isAdmin"
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    isAdmin,
  }) {
    const duplicateCheckUsername = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1`,
      [username]
    );

    const duplicateCheckEmail = await db.query(
      `SELECT email
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (duplicateCheckUsername.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    if (duplicateCheckEmail.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username,
         password,
         first_name,
         last_name,
         Email,
         is_admin)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [username, hashedPassword, firstName, lastName, email, isAdmin]
    );

    const user = result.rows[0];

    return user;
  }

  static async findAll() {
    const result = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin"
       FROM users
       ORDER BY username`
    );

    return result.rows;
  }

  static async get(username) {
    const userResult = await db.query(
      `SELECT username,
              first_name AS "firstName",
              last_name AS "lastName",
              email,
              is_admin AS "isAdmin"
       FROM users
       WHERE username = $1`,
      [username]
    );
    const user = userResult.rows[0];

    if (!user) throw new NotFoundError(`no user found: ${username}`);

    const userMovieList = await db.query(
      `SELECT m.favorite_id
       FROM watch_list AS m
       WHERE m.username = $1`,
      [username]
    );

    const userTVShowList = await db.query(
      `SELECT tv.favorite_id
       FROM watch_list AS tv
       WHERE tv.username = $1`,
      [username]
    );

    user.movie_list = userMovieList.rows.map((m) => m.favorite_id);
    user.tvshow_list = userTVShowList.rows.map((tv) => tv.favorite_id);

    return user;
  }

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      isAdmin: "is_admin",
    });

    const usernameVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE users
                      SET ${setCols}
                      WHERE username = ${usernameVarIdx}
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                is_admin AS "isAdmin"`;

    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user found: ${username}`);
    return user;
  }

  static async remove(username) {
    let result = await db.query(
      `DELETE
       FROM users
       WHERE username = $1
       RETURNING username`,
      [username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`no user found: ${username}`);
  }

  // add movie to user's favorite list
  // add tv show to user's favorite list
}

module.exports = User;
