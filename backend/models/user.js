"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helper/sql");
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

    const user = result.row[0];

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
    const duplicateCheck = await db.query(
      `SELECT username
         FROM users
         WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
        (username,
         password,
         first_name,
         last_name,
         Email,
         is_admin)
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [username, hashedPassword, firstName, lastName, email, isAdmin]
    );

    const user = result.rows[0];

    return user;
  }

  static async findAll() {
    const result = db.query(
      `SELECT username,
        first_name AS "firstName",
        last_name AS "lastName",
        Email AS "email"
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
       FROM watch_list
       WHERE m.user_id = $1`,
      [user.id]
    );

    const userTVShowList = await db.query(
      `SELECT tv.favorite_id
       FROM watch_list
       WHERE tv.user_id = $1`,
      [user.id]
    );

    user.movie_list = userMovieList.map((m) => m.favorite_id);
    user.tvshow_list = userTVShowList.map((tv) => tv.favorite_id);

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

    const querySql =
      (`
      UPDATE users
      SET ${setCols}
      WHERE username = $1
      RETURNING username,
                first_name AS "firstName",
                last_name AS "lastName,
                Email AS "email",
                is_admin AS "isAdmin
                `,
      [usernameVarIdx]);

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
}
