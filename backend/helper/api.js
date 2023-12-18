const { API_KEY } = require("../config");
const BASE_URL = `https://api.themoviedb.org/3/`

const Popular = (type) => {
    let URL = `${BASE_URL}${type}/popular?${API_KEY}`


}

