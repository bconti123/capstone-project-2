"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helper/sql.js");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

class Movie {
  // Add
  static async add({
    id,
    title,
    overview,
    release_date,
    poster_path,
    genres_id,
  }) {
    const duplicateCheck = await db.query(
      `SELECT id, title
             FROM movies
             WHERE id = $1`,
      [id]
    );
    const duplicateCheckTitle = await db.query(
      `SELECT id, title
             FROM movies
             WHERE title = $1`,
      [title]
    );
    if (duplicateCheck.rows[0] || duplicateCheckTitle.rows[0]) {
      throw new BadRequestError(`Duplicate title: ${title} ${id}`);
    }

    const result = await db.query(
      `INSERT INTO movies(
            id,
            title,
            overview,
            release_date,
            poster_path,
            genres_id
        )
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, title, overview, release_date, poster_path, genres_id`,
      [id, title, overview, release_date, poster_path, genres_id]
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
              genres_id 
        FROM movies
        ORDER BY title`
    );

    return result.rows;
  }
  // GET
  static async get(data) {
    const result = await db.query(
      `SELECT id, 
              title, 
              overview, 
              release_date, 
              poster_path, 
              genres_id 
        FROM movies
        WHERE id = $1`,
      [data]
    );
    const movie = result.rows[0];

    if (!movie) throw new NotFoundError(`no movie found: ${data}`);
    return movie;
  }
  // UPDATE
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      title: "title",
      overview: "overview",
      release_date: "release_date",
      poster_path: "poster_path",
      genres_id: "genres_id",
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
                                genres_id`;

    const result = await db.query(querySql, [...values, id]);
    const movie = result.rows[0];

    if (!movie) throw new NotFoundError(`No movie found: ${id}`);
    return movie;
  }
  // DELETE
  static async remove(id) {
    let result = await db.query(
      `DELETE
       FROM movies
       WHERE id = $1
       RETURNING title`,
      [id]
    );

    const movie = result.rows[0];
    if (!movie) throw new NotFoundError(`no movie found: ${id}`);
  }
}

module.exports = Movie;
