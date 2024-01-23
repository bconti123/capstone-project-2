import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import backendAPI from "../helper/api";

const Profile = () => {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (evt, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    try {
      await backendAPI.updateUsername(currentUser.username, profileData);
      console.log("UPDATED!");
    } catch (errors) {
      setFormErrors(errors);
      console.debug(formErrors);
      return;
    }
  };
  return (
    <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Welcome {currentUser.firstName}!
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Group widths={"equal"}>
              <Form.Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={currentUser.username}
                disabled
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder={currentUser.firstName}
              />
              <Form.Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder={currentUser.lastName}
              />
            </Form.Group>
            <Form.Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={currentUser.email}
            />
            <Button type="submit" primary fluid>
              Update
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
