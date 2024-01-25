# Backend Documentation

## Development API URL: http://localhost:3001

### User Route
    - GET /users 
    - GET /users/:username
    - POST /users
    - UPDATE /users/:username
    - DELETE /users/:username
### Display user's list - Will add this to user model and route later
    - GET /users/:username/movies
    - GET /users/:username/tvshows

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

### Will add search function later. 

### Movies Route 
    - GET /movies
    - POST /movies
    - GET /movies/:id
    - GET /movies/list/:filterType/:page?

    - GET /movies/search/:keyword


### TV Series Route
    - GET /tvshows
    - POST /tvshows
    - GET /tvshows/:id
    - GET /tvshows/list/:filterType/:page?

    - GET /tvshows/search/:keyword
