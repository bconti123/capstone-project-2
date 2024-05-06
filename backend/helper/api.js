const axios = require("axios");

const { API_TOKEN, API_KEY } = require("../config");
const { BadRequestError } = require("../expressError");
const BASE_URL = `https://api.themoviedb.org/3`;

class mediaAPI {
  static async APIrequest(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${API_TOKEN}` };
    const method = "get";
    try {
      return await axios({ url, method });
    } catch (e) {
      console.error("API Error: ", e.response.data);
      let message = e.response.data;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Movies: filterType = now_playing, popular, upcoming, or top_rated
  // TV Series: filterType = airing_today, on_the_air, popular, or top_rated
  static async MediaTypeList(mediaType, filterType, page = 1) {
    try {
      const pageNumber = parseInt(page, 10);
      if (isNaN(pageNumber) || pageNumber < 1) {
        throw new BadRequestError("Invalid page number");
      }
      return await this.APIrequest(
        `${mediaType}/${filterType}?page=${pageNumber}&language=en&api_key=${API_KEY}`
      );
    } catch (e) {
      console.error(
        `Error fetching now playing ${(mediaType === "movie"
          ? "movies"
          : "tv series")}: `,
        e
      );
      throw e;
    }
  }

  static async MediaTypeTrending(mediaType) {
    try {
      return await this.APIrequest(`trending/${mediaType}/day?&api_key=${API_KEY}`);
    } catch (e) {
      console.error(
        `Error fetching now playing ${(mediaType === "movie"
          ? "movies"
          : "tv series")}: `,
        e
      );
      throw e;
    }
  }
}

module.exports = mediaAPI;
