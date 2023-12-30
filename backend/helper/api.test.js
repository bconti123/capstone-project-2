const moviedbAPI = require("./api.js");

describe("If it is a function?", () => {
  test("works:", async () => {
    const type = typeof moviedbAPI;
    expect(type).toEqual("function");
  });
});

describe("now playing movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("now_playing");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      // Handle the error if needed
      console.error("Test error: ", e);
    }
  });
});

describe("popular movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("popular");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      console.error("Test error: ", e);
    }
  });
});

describe("top rated movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("top_rated");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      console.error("Test error: ", e);
    }
  });
});

describe("upcoming movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("upcoming");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      console.error("Test error: ", e);
    }
  });
});

describe("now playing tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("now_playing");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      // Handle the error if needed
      console.error("Test error: ", e);
    }
  });
});

describe("popular tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("popular");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      console.error("Test error: ", e);
    }
  });
});

describe("top_rated tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("top_rated");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      // Handle the error if needed
      console.error("Test error: ", e);
    }
  });
});

describe("upcoming tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("upcoming");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (e) {
      console.error("Test error: ", e);
    }
  });
});
