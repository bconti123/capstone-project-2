import React from "react";

// { LoginForm, SignupForm } => Alert

const Alert = ({ type = "danger", messages = [] }) => {
    console.debug("Alert", "type=", type, "messages=", messages);

    return (
        <h1>Alert!</h1>
    )
}