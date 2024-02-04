import React, { useEffect, useState } from "react";
import {
  Header,
  Modal,
  Item,
  Image,
  Container,
  Divider,
  Segment,
  Label,
} from "semantic-ui-react";
import AverageRating from "./helper/rating";
import AddtoList from "./helper/AddtoList";
import mediaAPI from "../helper/tmdb-api";
import VideoURL from "./helper/video";
import CountryCertication from "./helper/certifcation";
import Genres from "./helper/genres";
import ReleaseorAir from "./helper/ReleaseorAir";
import backendAPI from "../helper/api";

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

  const [add, setAdd] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const GetDetail = async (mediaType, id) => {
      let detail = await mediaAPI.MediaInfo(mediaType, id);
      setData(detail.data);
      setVideoData(detail.data.videos.results);
      console.debug("data: ", data);
      console.debug("videos: ", videoData);
      setAdd(true);
      console.debug("add: ", add);
    };
    const RemoveDetail = async (mediaType, id) => {
      try {
        if (mediaType === "movie") {
          await backendAPI.removeMovieList(id);
        } else {
          await backendAPI.removeTVList(id);
        }
        setDel(false);
      } catch (e) {
        console.debug("An error occurred: ", e);
      }
    };

    if (open && !del) {
      GetDetail(type, selectedItem.id);
    }
    if (!open && del) {
      RemoveDetail(type, selectedItem.id);
    }
  }, [type, open, del, selectedItem]);

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
                  <CountryCertication data={data} />
                </Header>

                <ReleaseorAir data={data} />
                <Genres data={data} />
                <p>{data?.overview}</p>
                <AverageRating vote_average={data?.vote_average} />
                <AddtoList
                  selectedItem={selectedItem}
                  add={add}
                  setAdd={setAdd}
                  del={del}
                  setDel={setDel}
                />
              </Container>
            </Item.Content>
            <Header as="h1" textAlign="center">
              Video
            </Header>
            <Divider />
            <Item.Content>
              <Container>
                {data?.title && (
                  <VideoURL key={videoData[0]?.key} url={videoData[0]?.key} />
                )}
              </Container>
            </Item.Content>
          </Item>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default MediaDetail;
