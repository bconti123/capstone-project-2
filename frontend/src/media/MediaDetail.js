import React, { useEffect, useState } from "react";
import { Header, Modal, Item, Image, Container } from "semantic-ui-react";
import AverageRating from "./helper/rating";
import AddtoList from "./helper/AddtoList";
import mediaAPI from "../helper/tmdb-api";

const MediaDetail = ({ mediaType, closeModal, open, selectedItem }) => {
  const [data, setData] = useState(null);
  let type = mediaType === "movies" ? "movie" : "tv";
  // useEffect(() => {
  //   if (open) {

  //   } else {
  //     console.debug("Not Open")
  //   }
  // }, [mediaType, selectedItem.id]);
  useEffect(() => {
    if (open) {
      const GetDetail = async (mediaType, id) => {
        let detail = await mediaAPI.MediaInfo(mediaType, id);
        setData(detail.data);
      };
      GetDetail(type, selectedItem.id);
    }
  }, [type, selectedItem, open]);

  return (
    <Modal onClose={closeModal} open={open} style={{ width: "70%" }}>
      <Modal.Content style={{ padding: 0, overflow: "hidden" }}>
        {selectedItem && (
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
                  {selectedItem.title || selectedItem.name}
                </Header>
                <p>{selectedItem.overview}</p>
                <AverageRating vote_average={data?.vote_average} />
                <p>{selectedItem.id}</p>
                <AddtoList selectedItem={selectedItem} />
              </Container>
            </Item.Content>
          </Item>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default MediaDetail;
