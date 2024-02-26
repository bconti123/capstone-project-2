import React, { useState } from "react";
import { Dropdown, Header } from "semantic-ui-react";
import Episodes from "./episode";

const Season = ({ data }) => {
  const [selectedSeason, setSelectedSeason] = useState(data.seasons[0]);
  const options = data.seasons.map((season) => ({
    key: season.season_number,
    text: `Season ${season.season_number}`,
    value: season.season_number,
  }));

  const handleChange = (e, { value }) => {
    const selectedSeasonData = data.seasons.find(
      (season) => season.season_number === value
    );
    setSelectedSeason(selectedSeasonData);
    // console.debug("selected", selectedSeasonData);
  };
  return (
    <>
     <Header>
      <Dropdown
        placeholder="Select Season"
        selection
        options={options}
        value={selectedSeason.season_number}
        onChange={handleChange}
      />
      </Header>
      {selectedSeason && (
        <>
          {/* Pass the selected season data to Episodes component */}
          <Episodes
            key={selectedSeason.id}
            id={data.id}
            season_number={selectedSeason.season_number}
            episodes={selectedSeason.episodes}
          />
        </>
      )}
    </>
  );
};

export default Season;
