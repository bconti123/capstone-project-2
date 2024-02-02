import React from "react";

const ReleaseorAir = ({ data }) => {
  let date;
  if (data.title) {
    date = data?.release_date.split("-")[0];
  }
  if (data.name) {
    // date = data?.first_air_date.split("-")[0];
    date = data?.first_air_date;
  }
  return (
    <p>
      {data.title ? "Release Year:" : " First Air Date: "} {date}
    </p>
  );
};

export default ReleaseorAir;
