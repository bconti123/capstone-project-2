import React from "react";
import { useState, useEffect } from "react";
import backendAPI from "../helper/api";
import { Image, Segment } from "semantic-ui-react";

const MediaList = ({ mediaType, filterType }) => {
  const [media, setMedia] = useState(null);

  const List = async (mediaType, filterType) => {
    let media = await backendAPI.getMediaList(mediaType, filterType);
    setMedia(media);
    console.log(media.results);
  };

  useEffect(() => {
    console.log("MediaList useEffect", mediaType, filterType);
    List(mediaType, filterType);
  }, [mediaType, filterType]);
  if (!media) return <p>Loading...</p>;

  return (
    <Segment>
      MediaList
      {media.results.map((item) => (
        <Image src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} />
      ))}
    </Segment>
  );
};

export default MediaList;
