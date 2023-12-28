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
    } catch (error) {
      // Handle the error if needed
      console.error("Test error: ", error);
    }
  });
});

describe("popular movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("popular");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});

describe("top rated movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("top_rated");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});

describe("upcoming movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.movieList("upcoming");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});

describe("now playing tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("now_playing");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      // Handle the error if needed
      console.error("Test error: ", error);
    }
  });
});

describe("popular tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("popular");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});

describe("top_rated tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("top_rated");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      // Handle the error if needed
      console.error("Test error: ", error);
    }
  });
});

describe("upcoming tv", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.tvList("upcoming");
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});
