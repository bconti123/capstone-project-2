import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Segment, Form } from "semantic-ui-react";

const DemoLoginForm = ({demo}) => {
    const navigate = useNavigate();

    const [formErrors, setFormErrors] = useState([]);
    const [load, setLoad] = useState(false);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let result = await demo();
        if (result.success) {
            setLoad(false);
            navigate("/");
        } else {
            setFormErrors(result.errors);
            console.debug(formErrors);
            setLoad(false);
        }
    };

    return (
        <Segment>
            <p>You don't have to create an account. You can demo login.</p>
            <Form onSubmit={handleSubmit}>
                <Button type="submit" primary loading={load}>
                    {load ? "Loading..." : "Demo Login"}
                </Button>
            </Form>
      </Segment>
    );
}

export default DemoLoginForm;