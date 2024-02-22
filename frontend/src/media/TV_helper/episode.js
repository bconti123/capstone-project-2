import React, { useEffect, useState } from "react";
import { List, Header } from "semantic-ui-react";
import mediaAPI from "../../helper/tmdb-api";

const Episode = ({ id, season_number, episode_number }) => {
  const [episodeDetail, setEpisodeDetail] = useState(null);
  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const data = await mediaAPI.TVEpisode(id, season_number, episode_number);
        setEpisodeDetail(data)
        console.debug("ep details: ", episodeDetail)
      } catch (error) {
        console.error("Error fetching episode data", error);
      }
    };

    fetchEpisodeData();
  }, [id, season_number]);

  return (
    <>
      {episodeDetail && (
        <List.Item>
          <List.Icon name="tv" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{episodeDetail?.name}</List.Header>
            <List.Description>
              Episode {episodeDetail?.episode_number} | Air Date:{" "}
              {episodeDetail?.air_date || "Not available"}
            </List.Description>
          </List.Content>
        </List.Item>
      )}
    </>
  );
};

const Episodes = ({ id, season_number, episodes }) => {
  const [episodeData, setEpisodeData] = useState(null);
  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const data = await mediaAPI.TVSeason(id, season_number);
        setEpisodeData(data);
        console.debug("eps: ", episodeData)
      } catch (error) {
        console.error("Error fetching episode data", error);
      }
    };

    fetchEpisodeData();
  }, [id, season_number]);
  console.debug("eps: ", episodeData)
  console.debug("id: ", id, "season number: ", season_number, "eps: ", episodes)
  return (
    <>
      <Header as="h2">Season {season_number}</Header>
      <List divided relaxed>
        {episodeData?.episodes.map((episode) => (
          // Return the Episode component here
          <Episode
            key={episode.id}
            id={id}
            season_number={season_number}
            episode_number={episode.episode_number}
          />
        ))}
      </List>
    </>
  );
};

export default Episodes;