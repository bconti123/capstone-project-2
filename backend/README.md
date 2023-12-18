# Backend Documentation

## Development API URL: http://localhost:3001

### User Route
- GET /user
- GET /user/:id
- POST /user
- UPDATE /user/:id
- DELETE /user/:id

    #### Add movie/tv show to user's favorite list
    - POST /user/:id/movie/:movie_id
    - POST /user/:id/tvshow/:tvshow_id
### Authentication Route
- POST /auth/token
- POST /auth/register
### Movies Route
- GET /movie
- GET /movie/:id
- POST /movie
- UPDATE /movie/:id
- DELETE /movie/:id 
### TV Series Route
- GET /tvshow
- GET /tvshow/:id
- POST /tvshow
- UPDATE /tvshow/:id
- DELETE /tvshow/:id