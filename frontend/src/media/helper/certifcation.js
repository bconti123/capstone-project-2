import React, { useEffect, useState } from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import mediaAPI from "../../helper/tmdb-api";

const CountryCertication = ({ data }) => {
  let certData;
  
  if (data.title) {
    const countryCode = data.release_dates.results;
    const release_date = countryCode.find((item) => item.iso_3166_1 === "US");
    console.debug(countryCode);
    // Check if release_date is not undefined before accessing its properties
    certData = release_date ? release_date.release_dates[0].certification : "N/A";
    console.debug(certData);
  }
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (data.name) {
      const getContent = async () => {
        try {
          let TVdata = await mediaAPI.TVContent(data.id);
          setContent(TVdata);
          console.debug("content: ", content);
        } catch (e) {
          console.error("An error occurred:", e);
        }
      };
      getContent();
    }
  }, [data]);
  if (data.name && content && content.length > 0) {
    certData = content?.find((item) => item.iso_3166_1 === "US").rating;
    console.debug(content);
  } else if (!data.name && !data.title) {
    certData = "N/A"
  };

  return (
    <Label basic size="small" circular>
      <Header as="h3" textAlign="center" block>
        {certData}
      </Header>
    </Label>
  );
};

export default CountryCertication;
