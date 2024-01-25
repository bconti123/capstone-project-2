import React from "react";
import { Rating } from "semantic-ui-react";

const AverageRating = ({ vote_average }) => {
  let avg_vote = parseFloat(vote_average).toFixed(2) / 2;
  return (
    <p>
      <Rating icon="star" size="large" defaultRating={avg_vote} maxRating={5} disabled /> {avg_vote} 
      /5
    </p>
  );
};

export default AverageRating;
