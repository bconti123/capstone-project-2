import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Segment textAlign="center" vertical>
      <Header as="h1">The Streaming Application</Header>

      <Button primary as={Link} to="/login">
        Login
      </Button>
      <Button primary as={Link} to="/signup">
        Sign Up
      </Button>
    </Segment>
  );
};

export default Home;
