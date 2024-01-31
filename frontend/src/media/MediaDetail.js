import React, { useEffect, useState } from "react";
import {
  Header,
  Modal,
  Item,
  Image,
  Container,
  Divider,
} from "semantic-ui-react";
import AverageRating from "./helper/rating";
import AddtoList from "./helper/AddtoList";
import mediaAPI from "../helper/tmdb-api";
import VideoURL from "./helper/video";

const MediaDetail = ({
  mediaType,
  closeModal,
  open,
  selectedItem,
  setSelectedItem,
}) => {
  const [data, setData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  let type = mediaType === "movies" ? "movie" : "tv";

  useEffect(() => {
    if (open) {
      const GetDetail = async (mediaType, id) => {
        let detail = await mediaAPI.MediaInfo(mediaType, id);
        setData(detail.data);
        setVideoData(detail.data.videos.results);
        console.debug("data: ", data);
        console.debug("videos: ", videoData);
      };
      GetDetail(type, selectedItem.id);
    }
  }, [type, open, selectedItem]);

  return (
    <Modal
      onClose={closeModal}
      open={open}
      style={{ width: "70%" }}
      size="fullscreen"
    >
      <Modal.Content style={{ padding: 0, overflow: "hidden" }}>
        {data && (
          <Item>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`}
              floated="left"
              fluid
              style={{ width: "100%" }}
            />
            <Item.Content style={{ marginBottom: "20px" }}>
              <Container text>
                <Header as="h1" textAlign="center">
                  {data?.title || data?.name}
                </Header>
                <p>{data?.overview}</p>
                <AverageRating vote_average={data?.vote_average} />
                <AddtoList selectedItem={selectedItem} />
              </Container>
            </Item.Content>
            <Header as="h1" textAlign="center">
              Video
            </Header>
            <Divider />
            <Item.Content>
              <Container>
                <VideoURL key={videoData[0]?.key} url={videoData[0]?.key} />
              </Container>
            </Item.Content>
          </Item>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default MediaDetail;
