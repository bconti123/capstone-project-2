import React, { useState } from "react";
import { Image, Segment, Header } from "semantic-ui-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MediaItem.css";
import MediaDetail from "./MediaDetail";

const MediaItem = ({ mediaType, media }) => {
  const settings = {
    slidesToShow: 7,
    slidesToScroll: 1,
    swipeToSlide: true, // Enable direct mouse movement
    infinite: true, // Ensure infinite loop
    dots: true,
    // arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setOpen(false);
  };
  return (
    <>
      <Slider {...settings}>
        {media.results.map((item) => (
          <div key={item.id}>
            {item.poster_path ? (
              <>
                <Image
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  bordered
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(item)
                  }}
                  style={{
                    width: "200px",
                    height: "300px",
                    cursor: "pointer",
                  }}
                />
              </>
            ) : (
              <Segment
                textAlign="center"
                style={{ width: "200px", height: "300px", cursor: "pointer" }}
              >
                <Header as="h3" textAlign="center">
                  {item.title || item.name}
                </Header>
                No image
              </Segment>
            )}
          </div>
        ))}
      </Slider>
      <MediaDetail mediaType={mediaType} closeModal={closeModal} open={open} selectedItem={selectedItem} />
    </>
  );
};

export default MediaItem;
