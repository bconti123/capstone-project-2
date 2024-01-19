import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";

// import pages
import Home from "../homepage/Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import MediaList from "../media/MediaList";

const RouterApp = ({ login, signup }) => {
  return (
    <Container fluid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm login={login} />} />
        <Route exact path="/signup" element={<SignupForm signup={signup} />} />

        <Route path="/movies" element={<MediaList mediaType="movies" filterType="popular" />} />
        {/* Add more later */}
        <Route path="*" element={<h1>404! ERROR</h1>} />
      </Routes>
    </Container>
  );
};

export default RouterApp;
