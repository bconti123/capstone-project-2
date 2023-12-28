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
      console.error("API Error: ", e.response);
      let message = e.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async movieNowPlaying(page=1) {
    try {
      return await this.APIrequest(`movie/now_playing?page=${page}`);
    } catch (e) {
      console.error("Error fetching now playing movies: ", e);
      throw error;
    }
  }
  static async moviePopular(page=1) {
    try {
      return await this.APIrequest(`movie/popular?page=${page}`);
    } catch (e) {
      console.error("Error fetching now playing movies: ", e);
      throw error;
    }
  }
}

module.exports = moviedbAPI;
