const jwt = require("jsonwebtoken");
const { createToken } = require("./token");
const { SECRET_KEY } = require("../config");

describe("createToken", () => {
  test("works: not admin", () => {
    const token = createToken({ username: "test", is_admin: false });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test",
      is_admin: false,
    });
  });

  test("works: admin", () => {
    const token = createToken({ username: "admintest", is_admin: true });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "admintest",
      is_admin: true,
    });
  });

  test("works: default no admin", () => {
    const token = createToken({ username: "non_admintest" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "non_admintest",
      is_admin: false,
    });
  });
});
