import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Grid, Segment, Header, Message } from "semantic-ui-react";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const [load, setLoad] = useState(false);

  const handleChange = (evt, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoad(true);
    let result = await login(formData);
    // console.log("Form submitted: ", formData);
    if (result.success) {
      setLoad(false);
      navigate("/");
    } else {
      setFormErrors(result.errors);
      console.debug(formErrors);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "75vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log in to your account
        </Header>
        <Segment stacked>
          <Form onSubmit={handleSubmit} size="large">
            <Form.Input
              placeholder="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Form.Input
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button type="submit" primary fluid loading={load}>
              {load ? "Loading..." : "Login"}
            </Button>
          </Form>
        </Segment>
        <Message>
          Are you new to this?
          <Link to="/signup"> Sign Up</Link>
          
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
