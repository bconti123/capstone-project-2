"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const User = require("./user.js");
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

// Authenticate

describe("authenticate", () => {
  test("usertest1 works", async () => {
    const user = await User.authenticate("usertest1", "password1");
    expect(user).toEqual({
      username: "usertest1",
      firstName: "user1",
      lastName: "test",
      email: "user1@test.com",
      isAdmin: false,
    });
  });

  test("usertest2 works", async () => {
    const user = await User.authenticate("usertest2", "password2");
    expect(user).toEqual({
      username: "usertest2",
      firstName: "user2",
      lastName: "test",
      email: "user2@test.com",
      isAdmin: false,
    });
  });

  test("unauthenticate if no such user", async () => {
    try {
      await User.authenticate("idk", "idkpass");
      fail();
    } catch (e) {
      expect(e instanceof UnauthorizedError).toBeTruthy();
    }
  });

  test("unauthenticate if wrong password", async () => {
    try {
      await User.authenticate("usertest1", "wrongpassword");
    } catch (e) {
      expect(e instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

// Register

describe("register", () => {
  const newUser = {
    username: "new",
    firstName: "newtest",
    lastName: "test",
    email: "new@test.com",
    isAdmin: false,
  };

  test("works", async () => {
    let user = await User.register({ ...newUser, password: "password" });

    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'new'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].is_admin).toEqual(false);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("bad request with dup username", async () => {
    try {
      await User.register({ ...newUser, password: "password" });
      await User.register({
        ...newUser,
        email: "diff@test.com",
        password: "password",
      });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });

  test("bad request with dup email", async () => {
    try {
      await User.register({
        ...newUser,
        password: "password",
      });
      await User.register({
        ...newUser,
        username: "diff",
        password: "password",
      });
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
});

// findAll

describe("findAll", () => {
  test("works", async () => {
    const users = await User.findAll();
    expect(users).toEqual([
      {
        username: "usertest1",
        firstName: "user1",
        lastName: "test",
        email: "user1@test.com",
        isAdmin: false,
      },
      {
        username: "usertest2",
        firstName: "user2",
        lastName: "test",
        email: "user2@test.com",
        isAdmin: false,
      },
    ]);
  });
});

// get username

describe("get username", () => {
  test("works", async () => {
    const user = await User.get("usertest1");
    expect(user).toEqual({
      username: "usertest1",
      firstName: "user1",
      lastName: "test",
      email: "user1@test.com",
      isAdmin: false,
      movie_list: [],
      tvshow_list: [],
    });
  });
  test("not found if no such user", async () => {
    try {
      await User.get("no");
      fail();
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });
});

// update username

describe("update username", () => {
  test("works", async () => {
    const Updatedata = {
      firstName: "updateuser",
      lastName: "updatetest",
      email: "new@gmail.com",
      isAdmin: true,
    };
    const user = await User.update("usertest1", Updatedata);
    expect(user).toEqual({
      username: "usertest1",
      ...Updatedata,
    });
  });
  test("works: SET password", async () => {
    const UpdatePassword = {
      password: "newPassword",
    };
    const user = await User.update("usertest1", UpdatePassword);
    expect(user).toEqual({
      username: "usertest1",
      firstName: "user1",
      lastName: "test",
      email: "user1@test.com",
      isAdmin: false,
    });
    const found = await db.query(
      "SELECT * FROM users WHERE username = 'usertest1'"
    );
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });

  test("not found if no such user", async () => {
    try {
      await User.update("nope", { firstName: "newuser" });
      fail();
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request if no data", async () => {
    try {
      await User.update("u1", {});
      fail();
    } catch (e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
});

// Delete username
describe("delete username", () => {
  test("works", async () => {
    await User.remove("usertest1");
    const res = await db.query(
      "SELECT * FROM users WHERE username='usertest1'"
    );
    expect(res.rows.length).toEqual(0);
  });
  test("not found if no such user", async () => {
    try {
      await User.remove("nothing");
      fail();
    } catch (e) {
      expect(e instanceof NotFoundError).toBeTruthy();
    }
  });
});

// Add movie to user's list
describe("Add movie to user's list", () => {
  test("works", async () => {
    await User.add_movie("usertest1", 500);
    const res = await db.query(
      `SELECT * FROM movie_list WHERE username='usertest1'`
    );
    expect(res.rows.length).toEqual(1);
  });
});
// Delete movie from user's list
describe("Delete movie from user's list", () => {
  test("works", async () => {
    await User.add_movie("usertest1", 500);
    const res = await db.query(
      `SELECT * FROM movie_list WHERE username='usertest1'`
    );
    expect(res.rows.length).toEqual(1);
    await User.remove_movie("usertest1", 500);
    const delres = await db.query(
      `SELECT * FROM movie_list WHERE username='usertest1'`
    );
    expect(delres.rows.length).toEqual(0);
  });
});
// Add tv show to user's list
describe("Add tv show to user's list", () => {
  test("works", async () => {
    await User.add_tv("usertest1", 501);
    const res = await db.query(
      `SELECT * FROM tv_list WHERE username='usertest1'`
    );
    expect(res.rows.length).toEqual(1);
  });
});
// Delete tv show from user's list
describe("Delete tv show from user's list", () => {
  test("works", async () => {
    await User.add_tv("usertest1", 501);
    const res = await db.query(
      `SELECT * FROM tv_list WHERE username='usertest1'`
    );
    expect(res.rows.length).toEqual(1);
    await User.remove_tv("usertest1", 501);
    const delres = await db.query(
      `SELECT * FROM tv_list WHERE username='usertest1'`
    );
    expect(delres.rows.length).toEqual(0);
  });
});