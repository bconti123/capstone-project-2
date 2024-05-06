import React from "react";
import { Header, Segment } from "semantic-ui-react";
import MediaList from "../media/MediaList";

const Movie = () => {
  return (
    <Segment>
      {/* <Header as="h3" textAlign="center">Treading</Header>
      <MediaList mediaType="trending/movies" filterType="day" /> */}
      <Header as="h3">Popular</Header>
      <MediaList mediaType="movies" filterType="popular" />
      <Header as="h3">Now Playing</Header>
      <MediaList mediaType="movies" filterType="now_playing" />
      <Header as="h3">Upcoming</Header>
      <MediaList mediaType="movies" filterType="upcoming" />
      <Header as="h3">Top Rated</Header>
      <MediaList mediaType="movies" filterType="top_rated" />
    </Segment>
  );
};

export default Movie;
