"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helper/sql.js");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

class Movie {
  // Add
  static async add({ id, title, overview, release_date, poster_path, genres }) {
    const duplicateCheck = await db.query(
      `SELECT id, title
             FROM movies
             WHERE id = $1`,
      [data.id]
    );
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate title: ${data.title} ${data.id}`);
    }

    const result = await db.query(
      `INSERT INTO movies(
            id,
            title,
            overview,
            release_date,
            poster_path,
            genres
        )
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, title, overview, release_date, poster_path, genres`,
      [id, title, overview, release_date, poster_path, genres]
    );

    const movie = result.rows[0];

    return movie;
  }

  // FindAll
  static async findAll() {
    const result = await db.query(
      `SELECT id, 
              title, 
              overview, 
              release_date, 
              poster_path, 
              genres 
        FROM movies
        ORDER BY title`
    );

    return result.rows;
  }
  // GET
  static async get(id) {
    const result = await db.query(
      `SELECT id, 
              title, 
              overview, 
              release_date, 
              poster_path, 
              genres 
       FROM movies
       WHERE id=$1`,
      [id]
    );
    const movie = result.rows[0];

    if (!movie) throw NotFoundError(`no movie found: ${movie.title} ${id}`);
    return movie;
  }
  // UPDATE
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: "title",
      overview: "overview",
      release_date: "release_date",
      poster_path: "poster_path",
      genres: "genres",
    });
    const movieVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE movies
                      SET ${setCols}
                      WHERE id = ${movieVarIdx}
                      RETURNING id,
                                title,
                                overview,
                                release_date,
                                poster_path,
                                genres`;

    const result = await db.query(querySql, [...values, id]);
    const movie = result.rows[0];

    if (!movie) throw new NotFoundError(`No movie found: ${movie.title} ${id}`);
    return movie;
  }
  // DELETE
}

module.exports = Movie;
