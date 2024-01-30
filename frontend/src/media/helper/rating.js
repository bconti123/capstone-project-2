import React, { useEffect, useState } from "react";
import { Rating } from "semantic-ui-react";

const AverageRating = ({ vote_average }) => {
  const [vote_avg, setVote_Avg] = useState(null);

  useEffect(() => {
    if (vote_average) {
      let average = parseFloat((vote_average) / 2).toFixed(2);
      setVote_Avg(average);
    }
  }, [vote_average])
  
  return (
    <p>
      <Rating icon="star" size="large" rating={vote_avg} maxRating={5} disabled /> {vote_avg} 
      /5
    </p>
  );
};

export default AverageRating;
