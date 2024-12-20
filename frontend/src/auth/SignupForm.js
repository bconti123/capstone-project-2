import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const SignupForm = ({ signup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    let result = await signup(formData);
    // console.log("Form submitted: ", formData);
    // console.log("Username type: ", typeof formData.username);
    if (result.success) {
      setLoad(false);
      navigate("/");
    } else {
      setFormErrors(result.errors);
      console.debug(formErrors);
      setLoad(false);
    }
  };

  const handleChange = (evt, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {formErrors.length > 0 && <Message error list={formErrors} />}
        {load && <Message>Please wait while the backend server starts up</Message>}
        <Header as="h2" textAlign="center">
          Register your account
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <Form.Group widths={"equal"}>
              <Form.Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
              <Form.Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group widths={"equal"}>
              <Form.Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
              <Form.Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Button type="submit" primary fluid loading={load}>
              {load ? "Loading" : "Sign Up"}
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account?
          <Link to="/login"> Log In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default SignupForm;
