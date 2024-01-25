"use strict";

const {
  NotFoundError,
  BadRequestError,
} = require("../expressError");

const TV = require("./tvshow.js");
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

describe("Add a tvshow", () => {
  const newTV = {
    id: 100,
    name: "new",
    overview: "description",
    first_air_date: "December 14, 2020",
    poster_path: "/image.jpg",
    genres_id: [1, 2, 3],
  };

  test("works", async () => {
    let tvshow = await TV.add({ ...newTV });

    expect(tvshow).toEqual(newTV);
    const found = await db.query(`SELECT * FROM tv_shows WHERE name = 'new'`);
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].overview).toEqual("description");
    expect(found.rows[0].poster_path).toEqual("/image.jpg");
  });

  test("bad request with dup name", async () => {
    try {
      await TV.add({ ...newTV });
      await TV.add({ ...newTV, id: 1000 });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
  test("bad request with dup id", async () => {
    try {
      await TV.add({ ...newTV });
      await TV.add({ ...newTV, name: "other" });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
});

describe("findAll", () => {
  test("works", async () => {
    const tvshow = await TV.findAll();
    expect(tvshow).toEqual([
      {
        id: 501,
        name: "tvshow1",
        overview: "overview1",
        first_air_date: "November 20, 2020",
        poster_path: "http://image1.com",
        genres_id: [1, 2, 3],
      },
      {
        id: 601,
        name: "tvshow2",
        overview: "overview2",
        first_air_date: "November 25, 2020",
        poster_path: "http://image2.com",
        genres_id: [1, 2, 3],
      },
    ]);
  });
});

describe("get tvshow", () => {
  test("works", async () => {
    const tvshow = await TV.get(501);
    expect(tvshow).toEqual({
      id: 501,
      name: "tvshow1",
      overview: "overview1",
      first_air_date: "November 20, 2020",
      poster_path: "http://image1.com",
      genres_id: [1, 2, 3],
    });
  });
  test("not found if no tvshow", async () => {
    try {
      await TV.get(9999);
      fail();
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });
});

describe("update tvshow", () => {
  test("works", async () => {
    const updateData = {
      name: "updatename",
      overview: "updateoverview",
      first_air_date: "November 02, 2020",
      poster_path: "update.jpg",
      genres_id: [1, 2, 3, 4],
    };
    const tvshow = await TV.update(501, updateData);
    expect(tvshow).toEqual({
      id: 501,
      ...updateData,
    });
  });

  test("works: SET first air date", async () => {
    const updateFirstAirDate = {
      first_air_date: "December 10, 2021",
    };
    const tvshow = await TV.update(501, updateFirstAirDate);
    expect(tvshow).toEqual({
      id: 501,
      name: "tvshow1",
      overview: "overview1",
      first_air_date: "December 10, 2021",
      poster_path: "http://image1.com",
      genres_id: [1, 2, 3],
    });
    const found = await db.query("SELECT * FROM tv_shows WHERE id = 501");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].first_air_date).toEqual("December 10, 2021");
  });

  test("not found if no tvshow", async () => {
    try {
        await TV.update(9999, { name: "nope"});
        fail();
    } catch (e) {
        expect(e instanceof NotFoundError).toBeTruthy();
    }
  })
});

describe("delete tvshow", () => {
    test("works", async () => {
        await TV.remove(501);
        const res = await db.query(
            "SELECT * FROM tv_shows WHERE id = 501"
        );
        expect(res.rows.length).toEqual(0);
    })

    test("not found if no tvshow", async () => {
        try {
            await TV.remove(9999);
            fail();
        } catch (e) {
            expect(e instanceof NotFoundError).toBeTruthy();
        }
    })
})
