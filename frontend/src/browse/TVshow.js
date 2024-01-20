import React from "react";
import { Header, Segment } from "semantic-ui-react";
import MediaList from "../media/MediaList";

const TVshow = () => {
  return (
    <Segment>
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

export default TVshow;
