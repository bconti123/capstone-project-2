const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config.js");

const commonBeforeAll = async () => {
  await db.query(`DELETE FROM users RETURNING username`);
  await db.query(`DELETE FROM movies RETURNING id`);
  await db.query(`DELETE FROM tv_shows RETURNING id`);

  await db.query(
    `
        INSERT INTO users(
            username, 
            password,
            first_name,
            last_name,
            email)
        VALUES ('usertest1', $1, 'user1', 'test', 'user1@test.com'),
               ('usertest2', $2, 'user2', 'test', 'user2@test.com')
               RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );
  await db.query(
    `
        INSERT INTO movies(
            id,
            title,
            overview,
            release_date,
            poster_path,
            genres
        )
        VALUES (500, 'movie1', 'overview1', 'November 20, 2020', 'http://image1.com', 'action'),
               (600, 'movie2', 'overview2', 'November 25, 2020', 'http://image2.com', 'action'),
               (700, 'movie3', 'overview3', 'November 01, 2020', 'http://image3.com', 'action'),
               (800, 'movie4', 'overview4', 'November 21, 2020', 'http://image4.com', 'action')`
  );

  await db.query(
    `
        INSERT INTO tv_shows(
            id,
            name,
            overview,
            first_air_date,
            poster_path,
            genres
        )
        VALUES (501, 'tvshow1', 'overview1', 'November 20, 2020', 'http://image1.com', 'action'),
               (601, 'tvshow2', 'overview2', 'November 25, 2020', 'http://image2.com', 'action'),
               (701, 'tvshow3', 'overview3', 'November 01, 2020', 'http://image3.com', 'action'),
               (801, 'tvshow4', 'overview4', 'November 21, 2020', 'http://image4.com', 'action')`
  );
};

const commonBeforeEach = async () => {
  await db.query("BEGIN");
};

const commonAfterEach = async () => {
  await db.query("ROLLBACK");
};

const commonAfterAll = async () => {
  await db.end();
};

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};
