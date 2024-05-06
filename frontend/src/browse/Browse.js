import React from "react";
import { Header, Segment } from "semantic-ui-react";
import MediaList from "../media/MediaList";
const Browse = () => {
  return (
    <Segment>
      <Header as="h1" textAlign="center">Movie</Header>
      <Header as="h3">Trending</Header>
      <MediaList mediaType="movies" trending={true} />
      <Header as="h3">Popular</Header>
      <MediaList mediaType="movies" filterType="popular" />
      <Header as="h3">Now Playing</Header>
      <MediaList mediaType="movies" filterType="now_playing" />
      <Header as="h3">Upcoming</Header>
      <MediaList mediaType="movies" filterType="upcoming" />
      <Header as="h3">Top Rated</Header>
      <MediaList mediaType="movies" filterType="top_rated" />
      <Header as="h1" textAlign="center">TV Show</Header>
      <Header as="h3">Popular</Header>
      <MediaList mediaType="tvshows" filterType="popular" />
      <Header as="h3">Airing Today</Header>
      <MediaList mediaType="tvshows" filterType="airing_today" />
      <Header as="h3">On the air</Header>
      <MediaList mediaType="tvshows" filterType="on_the_air" />
      <Header as="h3">Top Rated</Header>
      <MediaList mediaType="tvshows" filterType="top_rated" />
    </Segment>
  );
};

export default Browse;
