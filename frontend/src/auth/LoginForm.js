import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

const LoginForm = ({ login }) => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });
  
    const handleChange = (evt, { name, value }) => {
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = () => {
      console.log("Form submitted: ", formData);
    };
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    );
  };

  export default LoginForm;