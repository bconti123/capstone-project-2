const mediaAPI = require("./api.js");

describe("If it is a function?", () => {
  test("works:", async () => {
    const type = typeof mediaAPI;
    expect(type).toEqual("function");
  });
});

describe("now playing movie", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("movie", "now_playing");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("popular movie", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("movie", "popular");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("top rated movie", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("movie", "top_rated");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("upcoming movie", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("movie", "upcoming");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("airing today tv", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("tv", "airing_today");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("popular tv", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("tv", "popular");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("top_rated tv", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("tv", "top_rated");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});

describe("on the air tv", () => {
  test("works", async () => {
    const movie = await mediaAPI.MediaTypeList("tv", "on_the_air");
    expect(movie.data.results.length).toEqual(20);
    expect(movie.status).toEqual(200);
  });
});
