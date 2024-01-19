import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";

// import pages
import Home from "../homepage/Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

const RouterApp = ({ login, signup }) => {
  return (
    <Container fluid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm login={login} />} />
        <Route exact path="/signup" element={<SignupForm signup={signup} />} />
        {/* Add more later */}
        <Route path="*" element={<h1>404! ERROR</h1>} />
      </Routes>
    </Container>
  );
};

export default RouterApp;
