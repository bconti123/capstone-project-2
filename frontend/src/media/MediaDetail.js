import React from "react";
import { Header, Modal, Item, Image, Container } from "semantic-ui-react";
import AverageRating from "./helper/rating";
import AddtoList from "./helper/AddtoList";


const MediaDetail = ({ closeModal, open, selectedItem }) => {
  return (
    <Modal onClose={closeModal} open={open} style={{ width: "70%" }}>
      <Modal.Content style={{ padding: 0, overflow: "hidden" }}>
        {selectedItem && (
          <Item>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${selectedItem.backdrop_path}`}
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
                <AverageRating vote_average={selectedItem.vote_average}/>
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
