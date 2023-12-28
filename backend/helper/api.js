const fetch = require("node-fetch");
const axios = require("axios");

const { API_TOKEN } = require("../config");
const BASE_URL = `https://api.themoviedb.org/3`;

class moviedbAPI {
  static async APIrequest(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${API_TOKEN}` };
    const method = "get";
    try {
      return await axios({ url, method, headers });
    } catch (e) {
      console.error("API Error: ", e.response.data);
      let message = e.response.data.status_message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // type = now_playing, popular, upcoming, or top_rated
  static async movieList(type, page=1) {
    try {
      return await this.APIrequest(`movie/${type}?page=${page}&language=en`);
    } catch (e) {
      console.error("Error fetching now playing movies: ", e);
      throw e;
    }
  }

  static async tvList(type, page=1) {
    try {
      return await this.APIrequest(`tv/${type}?page${page}&language=en`)
    } catch (e) {
      console.error("Error fetching now playing movies: ", e);
      throw e;
    }
  }
}

module.exports = moviedbAPI;
