import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL || "http://localhost:3001";

/* API Class.
 *
 * Static class tying together methods used to get/send to the API from backend.
 *
 */

class backendAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = ({}.method = "get")) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`; // Example: http://localhost:3001/users, /auth, /movies, or /tvshows.
    const headers = { Authorization: `Bearer ${backendAPI.token}` }; // Pass the token, get route access from backend.
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error: ", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Auth route (For register and login)

  // POST /auth/token - Login
  static async login(username, password) {
    let res = await this.request("auth/token", { username, password }, "post");
    return res.token;
  }
  // POST /auth/register - Register
  static async register(username, password, firstName, lastName, email) {
    let res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );
    return res.token;
  }

  // User route

  // GET /users/:username
  static async getUsername(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // PATCH /users/:username
  static async updateUsername(username, data) {
    let res = await this.request(`users/${username}`, "patch");
    return res.user;
  }

  // DELETE /users/:username
  static async deleteUsername(username) {
    let res = await this.request(`users/${username}`, data, "delete");
    return res.deleted;
  }

  // POST /users/:username/movies/:movie_id
  static async addMovietoList(username, id) {
    let res = await this.request(`users/${username}/movies/${id}`, "post");
    return res.added;
  }

  // DELETE /users/:username/movies/:movie_id
  static async removeMovieList(username, id) {
    let res = await this.request(`users/${username}/movies/${id}`, "delete");
    return res.deleted;
  }

  // POST /users/:username/tvshows/:tvshow_id
  static async addTVList(username, id) {
    let res = await this.request(`users/${username}/tvshows/${id}`, "post");
    return res.added;
  }

  // DELETE /users/:username/tvshows/:tvshow_id
  static async removeTVList(username, id) {
    let res = await this.request(`users/${username}/tvshows/${id}`, "delete");
  }

  // Will add GET list in users route later.

}

export default backendAPI;