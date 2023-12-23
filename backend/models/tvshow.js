"use strict";

const db = require("../db.js");
const { sqlForPartialUpdate } = require("../helper/sql.js");
const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

class TV {
  // Add
  static async add({
    id,
    name,
    overview,
    first_air_date,
    poster_path,
    genres_id,
  }) {
    const duplicateCheck = await db.query(
      `SELECT id, name
             FROM tv_shows
             WHERE id = $1`,
      [id]
    );
    const duplicateCheckname = await db.query(
      `SELECT id, name
             FROM tv_shows
             WHERE name = $1`,
      [name]
    );
    if (duplicateCheck.rows[0] || duplicateCheckname.rows[0]) {
      throw new BadRequestError(`Duplicate name: ${name} ${id}`);
    }

    const result = await db.query(
      `INSERT INTO tv_shows(
            id,
            name,
            overview,
            first_air_date,
            poster_path,
            genres_id
        )
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, overview, first_air_date, poster_path, genres_id`,
      [id, name, overview, first_air_date, poster_path, genres_id]
    );

    const tv_show = result.rows[0];

    return tv_show;
  }

  // FindAll
  static async findAll() {
    const result = await db.query(
      `SELECT id, 
              name, 
              overview, 
              first_air_date, 
              poster_path, 
              genres_id 
        FROM tv_shows
        ORDER BY name`
    );

    return result.rows;
  }
  // GET
  static async get(data) {
    const result = await db.query(
      `SELECT id, 
              name, 
              overview, 
              first_air_date, 
              poster_path, 
              genres_id 
        FROM tv_shows
        WHERE id = $1`,
      [data]
    );
    const tv_show = result.rows[0];

    if (!tv_show) throw new NotFoundError(`no tv_show found: ${data}`);
    return tv_show;
  }
  // UPDATE
  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      name: "name",
      overview: "overview",
      first_air_date: "first_air_date",
      poster_path: "poster_path",
      genres_id: "genres_id",
    });
    const tv_showVarIdx = "$" + (values.length + 1);
    const querySql = `UPDATE tv_shows
                      SET ${setCols}
                      WHERE id = ${tv_showVarIdx}
                      RETURNING id,
                                name,
                                overview,
                                first_air_date,
                                poster_path,
                                genres_id`;

    const result = await db.query(querySql, [...values, id]);
    const tv_show = result.rows[0];

    if (!tv_show) throw new NotFoundError(`No tv_show found: ${id}`);
    return tv_show;
  }
  // DELETE
  static async remove(id) {
    let result = await db.query(
      `DELETE
       FROM tv_shows
       WHERE id = $1
       RETURNING name`,
      [id]
    );

    const tv_show = result.rows[0];
    if (!tv_show) throw new NotFoundError(`no tv_show found: ${id}`);
  }
}

module.exports = TV;
