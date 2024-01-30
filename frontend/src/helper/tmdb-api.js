import axios from "axios";

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

class mediaAPI {
  static async APIrequest(endpoint) {
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${API_TOKEN}` };
    const method = "get";
    try {
      return await axios({ url, method });
    } catch (e) {
      console.error("API Error: ", e.response ? e.response.data : e.message);
      let message = e.response.data;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Detail, Video, and Release Date
  static async MediaInfo(mediaType, id) {
    try {
      return await this.APIrequest(
        `${mediaType}/${id}?api_key=${REACT_APP_API_KEY}&append_to_response=videos,release_dates`
      );
    } catch (e) {
      console.error(
        `Error fetching ${mediaType === "movie" ? "movies" : "tv series"}`,
        e
      );
      throw e;
    }
  }
}

export default mediaAPI;
