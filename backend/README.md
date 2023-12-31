# Backend Documentation

## Development API URL: http://localhost:3001

### User Route
    - GET /users 
    - GET /users/:username
    - POST /users
    - UPDATE /users/:username
    - DELETE /users/:username

### Add movie/tv show to user's favorite list
    - POST /users/:username/movies/:movie_id
    - POST /users/:username/tvshows/:tvshow_id
### Delete movie/tv show from user's favorite list
    - DELETE /users/:username/movies/:movie_id
    - DELETE /users/:username/tvshows/:tvshow_id

### Authentication Route
    - POST /auth/token
    - POST /auth/register

### We will use TMDB API for movies and tv shows routes below:
### Movies Route
    - GET /movies
    - GET /movies/popular
    - GET /movies/now_playing
    - GET /top_rated
    - GET /movies/:id

### TV Series Route
    - GET /tvshows
    - GET /tvshows/popular
    - GET /tvshows/now_playing
    - GET /tvshows/top_rated
    - GET /tvshows/:id
