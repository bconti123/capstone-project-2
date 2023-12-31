CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    Email TEXT NOT NULL,
        CHECK (position('@' IN email) > 1),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    overview TEXT,
    release_date TEXT,
    poster_path TEXT,
    genres_id INTEGER []
);

CREATE TABLE tv_shows (
    id INTEGER PRIMARY KEY,
    name TEXT,
    overview TEXT,
    first_air_date TEXT,
    poster_path TEXT,
    genres_id INTEGER []
);

CREATE TABLE episodes (
    id INTEGER PRIMARY KEY,
    name TEXT,
    overview TEXT,
    air_date TEXT,
    episode_number INTEGER,
    season_number INTEGER,
    poster_path TEXT,
    tv_show_id INTEGER REFERENCES tv_shows ON DELETE CASCADE
);

CREATE TABLE movie_list (
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    PRIMARY KEY (username, movie_id)
);

CREATE TABLE tv_list (
    username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    tvshow_id INTEGER REFERENCES tv_shows(id) ON DELETE CASCADE,
    PRIMARY KEY (username, tvshow_id)
);