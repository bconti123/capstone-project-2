import React from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";
// =================== LOADING SPINNER =========================== //
const LoadingSpin = () => (
  <Container
    fluid
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Dimmer active />
    <Loader active size="massive" inline="centered" />
  </Container>
);
export default LoadingSpin;
