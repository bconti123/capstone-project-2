import React from "react";
import { Header, Label, Segment } from "semantic-ui-react";

const CountryCertication = ({ data }) => {
  const countryCode = data.release_dates.results;
  const release_date = countryCode.find((item) => item.iso_3166_1 === "US");
  console.debug(countryCode);
  // Check if release_date is not undefined before accessing its properties
  const certData = release_date
    ? release_date.release_dates[0].certification
    : "";
  console.debug(certData);

  return (
    <Label basic size="small" circular>
      <Header as="h3" textAlign="center" block>
        Rated {certData}{" "}
      </Header>
    </Label>
  );
};

export default CountryCertication;
