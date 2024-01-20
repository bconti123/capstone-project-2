import React from "react";
import {
  Image,
  Item,
  Segment,
  Reveal,
  RevealContent,
  Header,
} from "semantic-ui-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MediaItem.css";

const MediaItem = ({ media }) => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true, // Enable direct mouse movement
    infinite: true, // Ensure infinite loop
    dots:true,
    arrows: false,
    responsive: [
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

  return (
    // <Grid>
    //   {media.results.map((item) => (
    //     <GridColumn key={item.id} width={2}>
    //       <Image src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
    //     </GridColumn>
    //   ))}
    // </Grid>
    <Slider {...settings}>
      {media.results.map((item) => (
        <div key={item.id}>
          {item.poster_path ? (
            <Reveal animated="fade" style={{ width: "200px", height: "300px" }}>
              <RevealContent visible>
                <Image
                  src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </RevealContent>
              <RevealContent hidden>
                <Item textAlign="center" style={{ width: "100%", height: "300px", backgroundColor:"" }}>
                <Header as="h5" textAlign="center">{item.title || item.name}</Header>
                <Image
                  src={`https://image.tmdb.org/t/p/w200/${item.backdrop_path}`}
                  style={{ width: "100%", height: "auto" }}
                />
                </Item>
              </RevealContent>
            </Reveal>
          ) : (
            <Segment textAlign="center">Sorry, no image</Segment>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default MediaItem;
