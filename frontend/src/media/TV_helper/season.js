import React from "react";
import { Dropdown } from "semantic-ui-react";

const Season = ({ data }) => {
  const options = data.seasons.map((season) => ({
    key: season.season_number,
    text: `Season ${season.season_number}`,
    value: season.season_number,
  }));
  return (
    <Dropdown
      placeholder="Select Season"
      selection
      options={options}
      value={data.seasons[0].season_number}
    />
  );
};

export default Season;