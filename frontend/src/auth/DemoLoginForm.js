import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Segment, Form } from "semantic-ui-react";

const DemoLoginForm = ({demo}) => {
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let result = await demo();
        if (result.success) {
            navigate("/");
        } else {
            setFormErrors(result.errors);
            console.debug(formErrors);
        }
    };

    return (
        <Segment>
            <p>You don't have to create an account. You can demo login.</p>
            <Form onSubmit={handleSubmit}>
                <Button type="submit" primary>
                    Demo Login
                </Button>
            </Form>
      </Segment>
    );
}

export default DemoLoginForm;