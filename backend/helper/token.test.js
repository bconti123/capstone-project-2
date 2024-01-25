const jwt = require("jsonwebtoken");
const { createToken } = require("./token");
const { SECRET_KEY } = require("../config");

describe("createToken", () => {
  test("works: not admin", () => {
    const token = createToken({ username: "test", isAdmin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      isAdmin: false,
    });
  });

  test("works: admin", () => {
    const token = createToken({ username: "admintest", isAdmin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "admintest",
      isAdmin: true,
    });
  });

  test("works: default no admin", () => {
    const token = createToken({ username: "non_admintest" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "non_admintest",
      isAdmin: false,
    });
  });
});
