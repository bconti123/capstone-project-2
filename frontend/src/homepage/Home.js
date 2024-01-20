import React, { useContext } from "react";
import { Button, Header, Segment, Grid, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Broswe from "../browse/Browse";
import UserContext from "../auth/UserContext";

// Create Dashboard
// currentUser -> Dashboard
// otherwise -> Home
const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      {currentUser ? (
        <>
          <Broswe />
        </>
      ) : (
        <>
          <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" textAlign="center">
                Watch anywhere! Unlimited movies, TV shows, MORE!
              </Header>
              <Message>
                <Segment textAlign="center" vertical>
                  <Button primary as={Link} to="/login">
                    Login
                  </Button>
                  <Icon name="arrows alternate horizontal" />
                  <Button primary as={Link} to="/signup">
                    Sign Up
                  </Button>
                </Segment>
              </Message>
            </Grid.Column>
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
