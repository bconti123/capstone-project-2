import { Container } from "semantic-ui-react";
import MyList from "./MyList";

const UserList = () => {
  return (
    <Container fluid>
      <MyList mediaType="movies" />
      <MyList mediaType="tvshows" />
    </Container>
  );
};

export default UserList;