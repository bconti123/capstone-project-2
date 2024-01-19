import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

const LoginForm = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (evt, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let result = await login(formData);
    // console.log("Form submitted: ", formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.errors);
    }
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
