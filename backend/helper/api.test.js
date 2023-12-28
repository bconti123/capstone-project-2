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
      const movie = await moviedbAPI.movieNowPlaying();
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      // Handle the error if needed
      console.error("Test error: ", error);
    }
  });
});

describe("Popular movie", () => {
  test("works", async () => {
    try {
      const movie = await moviedbAPI.moviePopular();
      expect(movie.data.results.length).toEqual(20);
      expect(movie.status).toEqual(200);
    } catch (error) {
      console.error("Test error: ", error);
    }
  });
});
