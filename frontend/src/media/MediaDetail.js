import React from "react";
import { Header, Modal, Item, Image, Container } from "semantic-ui-react";


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
                <p>vote average: {selectedItem.vote_average}</p>
                <p>vote count: {selectedItem.vote_count}</p>
                <p>{selectedItem.id}</p>
              </Container>
            </Item.Content>
          </Item>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default MediaDetail;
