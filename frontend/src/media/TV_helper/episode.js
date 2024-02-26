import React, { useEffect, useState } from "react";
import { List, Header, Divider, Item, Container } from "semantic-ui-react";
import mediaAPI from "../../helper/tmdb-api";
import VideoURL from "../helper/video";

const Episode = ({ id, season_number, episode_number }) => {
  const [episodeDetail, setEpisodeDetail] = useState(null);
  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const data = await mediaAPI.TVEpisode(
          id,
          season_number,
          episode_number
        );
        setEpisodeDetail(data);
      } catch (error) {
        console.error("Error fetching episode data", error);
      }
    };

    fetchEpisodeData();
  }, [id, season_number, episode_number]);

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
        // console.debug(episodeData);
      } catch (error) {
        console.error("Error fetching episode data", error);
      }
    };
    fetchEpisodeData();
  }, [id, season_number]);

  return (
    <>
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

      <Header as="h1" textAlign="center">
        Video
      </Header>
      <Divider />
      <Item.Content>
        <Container>
          {episodeData?.videos.results.length > 0 ? (
            <>
              <VideoURL
                key={episodeData?.videos.results[0].key}
                url={episodeData?.videos.results[0].key}
              />
            </>
          ) : (
            <Header textAlign="center">No Video Avaliable</Header>
          )}
        </Container>
      </Item.Content>
    </>
  );
};

export default Episodes;
