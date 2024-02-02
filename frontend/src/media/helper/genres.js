import React from "react";
import { Header } from "semantic-ui-react";
const Genres = ({ data }) => {
  const genres = data.genres;
  return (
    <p>
  <Header as="h3" floated="left">Genre:</Header>{genres.map((genre, index) => (
    <React.Fragment key={genre.id}>
      {genre.name}
      {index+1 < genres.length - 1 ? ', ' : index+1 === genres.length - 1  ? ', & ' : ''}
    </React.Fragment>
      ))}
    </p>
  );
};

export default Genres;
