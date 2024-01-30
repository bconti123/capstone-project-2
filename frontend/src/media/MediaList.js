import React from "react";
import { useState, useEffect } from "react";
import backendAPI from "../helper/api";
import { Segment } from "semantic-ui-react";
import MediaItem from "./MediaItem";

const MediaList = ({ mediaType, filterType }) => {
  const [media, setMedia] = useState(null);



  useEffect(() => {
    // console.log("MediaList useEffect", mediaType, filterType);

    const List = async (mediaType, filterType) => {
      let media = await backendAPI.getMediaList(mediaType, filterType);
      setMedia(media);
      console.debug(media);
    };
    List(mediaType, filterType);
  }, [mediaType, filterType]);
  if (!media) return <p>Loading...</p>;

  return (
    <Segment>
      <MediaItem mediaType={mediaType} media={media} />
    </Segment>
  );
};

export default MediaList;
