import React, { useState } from "react";
import { GridColumn, Image } from "semantic-ui-react";
import MediaDetail from "../media/MediaDetail";

const MyListItem = ({ mediaType, media }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (media) => {
    setSelectedItem(media);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  return (
    <>
      <GridColumn key={media.id}>
        <Image
          src={`https://image.tmdb.org/t/p/w200/${media.poster_path}`}
          bordered
          onClick={(e) => {
            e.preventDefault();
            openModal(media);
          }}
          style={{
            width: "200px",
            height: "300px",
            cursor: "pointer",
          }}
        />
      </GridColumn>
      <MediaDetail
        mediaType={mediaType}
        closeModal={closeModal}
        open={open}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default MyListItem;
