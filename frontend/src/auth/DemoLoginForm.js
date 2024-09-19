import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Segment, Form, Message } from "semantic-ui-react";

const DemoLoginForm = ({ demo }) => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState([]);
  const [load, setLoad] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoad(true);
    let result = await demo();
    console.debug("result: ", result);
    if (result.success) {
      setLoad(false);
      navigate("/");
    } else {
      setFormErrors(result.errors);
      console.debug("form errors: ", formErrors);
      setLoad(false);
    }
  };

  return (
    <Segment>
      <p>You don't have to create an account. You can demo login.</p>
      <Form onSubmit={handleSubmit} size="large">
        <Button type="submit" primary loading={load}>
          {load ? "Loading..." : "Demo Login"}
        </Button>
      </Form>
      {formErrors.length > 0 && <Message error list={formErrors} />}
      {load && (
        <Message>Please wait while the backend server starts up</Message>
      )}
    </Segment>
  );
};

export default DemoLoginForm;
