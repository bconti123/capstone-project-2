"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const Movie = require("./movie.js");
const db = require("../db.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Add a movie", () => {
  const newMovie = {
    id: 100,
    title: "new",
    overview: "description",
    release_date: "December 14, 2020",
    poster_path: "/image.jpg",
    genres_id: [1, 2, 3],
  };

  test("works", async () => {
    let movie = await Movie.add({ ...newMovie });

    expect(movie).toEqual(newMovie);
    const found = await db.query(`SELECT * FROM movies WHERE title = 'new'`);
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].overview).toEqual("description");
    expect(found.rows[0].poster_path).toEqual("/image.jpg");
  });

  test("bad request with dup title", async () => {
    try {
      await Movie.add({ ...newMovie });
      await Movie.add({ ...newMovie, id: 1000 });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
  test("bad request with dup id", async () => {
    try {
      await Movie.add({ ...newMovie });
      await Movie.add({ ...newMovie, title: "other" });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("findAll", () => {
  test("works", async () => {
    const movie = await Movie.findAll();
    expect(movie).toEqual([
      {
        id: 500,
        title: "movie1",
        overview: "overview1",
        release_date: "November 20, 2020",
        poster_path: "http://image1.com",
        genres_id: [1, 2, 3],
      },
      {
        id: 600,
        title: "movie2",
        overview: "overview2",
        release_date: "November 25, 2020",
        poster_path: "http://image2.com",
        genres_id: [1, 2, 3],
      },
      {
        id: 700,
        title: "movie3",
        overview: "overview3",
        release_date: "November 01, 2020",
        poster_path: "http://image3.com",
        genres_id: [1, 2, 3],
      },
      {
        id: 800,
        title: "movie4",
        overview: "overview4",
        release_date: "November 21, 2020",
        poster_path: "http://image4.com",
        genres_id: [1, 2, 3],
      },
    ]);
  });
});

describe("get movie", () => {
  test("works", async () => {
    const movie = await Movie.get(500);
    expect(movie).toEqual({
      id: 500,
      title: "movie1",
      overview: "overview1",
      release_date: "November 20, 2020",
      poster_path: "http://image1.com",
      genres_id: [1, 2, 3],
    });
  });
  test("not found if no movie", async () => {
    try {
      await Movie.get(9999);
      fail();
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update movie", () => {
  test("works", async () => {
    const updateData = {
      title: "updatetitle",
      overview: "updateoverview",
      release_date: "November 02, 2020",
      poster_path: "update.jpg",
      genres_id: [1, 2, 3, 4],
    };
    const movie = await Movie.update(500, updateData);
    expect(movie).toEqual({
      id: 500,
      ...updateData,
    });
  });

  test("works: SET release date", async () => {
    const updateReleaseDate = {
      release_date: "December 10, 2021",
    };
    const movie = await Movie.update(500, updateReleaseDate);
    expect(movie).toEqual({
      id: 500,
      title: "movie1",
      overview: "overview1",
      release_date: "December 10, 2021",
      poster_path: "http://image1.com",
      genres_id: [1, 2, 3],
    });
    const found = await db.query("SELECT * FROM movies WHERE id = 500");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].release_date).toEqual("December 10, 2021");
  });

  test("not found if no movie", async () => {
    try {
        await Movie.update(9999, { title: "nope"});
        fail();
    } catch (e) {
        expect(e instanceof NotFoundError).toBeTruthy();
    }
  })
});

describe("delete movie", () => {
    test("works", async () => {
        await Movie.remove(500);
        const res = await db.query(
            "SELECT * FROM movies WHERE id = 500"
        );
        expect(res.rows.length).toEqual(0);
    })

    test("not found if no movie", async () => {
        try {
            await Movie.remove(9999);
            fail();
        } catch (e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})
