import React, { useEffect } from "react";
import { Embed } from "semantic-ui-react";

const VideoURL = ({ key, url }) => {
  const thumbnailURL = `https://img.youtube.com/vi/${url}/maxresdefault.jpg`;

  return (
    <>
      <Embed
        key={key}
        active
        id={url}
        placeholder={thumbnailURL}
        source="youtube"
        iframe={{
          allowFullScreen: true,
          style: {
            padding: 10,
          },
        }}
      />
    </>
  );
};

export default VideoURL;
