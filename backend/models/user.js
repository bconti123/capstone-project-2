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
      `SELECT movie_id
       FROM movie_list
       WHERE username = $1`,
      [username]
    );

    const userTVShowList = await db.query(
      `SELECT tvshow_id
       FROM tv_list
       WHERE username = $1`,
      [username]
    );

    user.movie_list = userMovieList.rows.map((m) => m.movie_id);
    user.tvshow_list = userTVShowList.rows.map((tv) => tv.tvshow_id);

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
  static async add_movie(username, movie_id) {
    const preCheck = await db.query(
      `SELECT id
       FROM movies
       WHERE id = $1`,
      [movie_id]
    );
    const movie = preCheck.rows[0];

    if (!movie) throw new NotFoundError(`No movie found: ${movie_id}`);

    await db.query(
      `INSERT INTO movie_list (username, movie_id)
       VALUES ($1, $2)
       RETURNING username`,
      [username, movie_id]
    );
  }
  // remove movie from user's favorite_list
  static async remove_movie(username, movie_id) {
    const preCheck = await db.query(
      `SELECT username, movie_id
       FROM movie_list
       WHERE username = $1
       AND movie_id = $2`,
      [username, movie_id]
    );
    const movie = preCheck.rows[0];

    if (!movie) throw new NotFoundError(`No movie found: ${movie_id}`);

    await db.query(
      `DELETE
       FROM movie_list
       WHERE username = $1
       AND movie_id = $2`,
      [username, movie_id]
    );
  }
  // add tv show to user's favorite list
  static async add_tv(username, tvshow_id) {
    const preCheck = await db.query(
      `SELECT id
       FROM tv_shows
       WHERE id = $1`,
      [tvshow_id]
    );
    const tv = preCheck.rows[0];

    if (!tv) throw new NotFoundError(`No tv show found: ${tvshow_id}`);
    await db.query(
      `INSERT INTO tv_list (username, tvshow_id)
       VALUES ($1, $2)
       RETURNING username`,
      [username, tvshow_id]
    );
  }
  // remove tv show from user's favorite list
  static async remove_tv(username, tvshow_id) {
    const preCheck = await db.query(
      `SELECT username, tvshow_id
       FROM tv_list
       WHERE username = $1
       AND tvshow_id = $2`,
      [username, tvshow_id]
    );
    const tv = preCheck.rows[0];

    if (!tv) throw new NotFoundError(`No movie found: ${tvshow_id}`);

    await db.query(
      `DELETE
       FROM tv_list
       WHERE username = $1
       AND tvshow_id = $2`,
      [username, tvshow_id]
    );
  }
}

module.exports = User;
