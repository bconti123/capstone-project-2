import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const SignupForm = ({ signup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (evt, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted: ", formData);
  };
  return (
    <Segment textAlign="center" vertical>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          width={6}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Form.Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Form.Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Form.Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Sign Up
        </Button>
      </Form>
    </Segment>
  );
};

export default SignupForm;
