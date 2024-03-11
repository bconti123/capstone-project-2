import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";

// import pages
import Home from "../homepage/Home";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import Movie from "../browse/Movie";
import TVshow from "../browse/TVshow";
import Profile from "../profile/Profile";
import UserContext from "../auth/UserContext";
import PublicRoute from "./PublicRoute";
import UserList from "../profile/UserList";
import LoadingSpin from "../common/Loading";

const RouterApp = ({ login, signup }) => {
  const { infoLoaded } = useContext(UserContext);
  if (!infoLoaded) return <LoadingSpin />;
  return (
    <Container fluid>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoute />}>
          <Route exact path="/login" element={<LoginForm login={login} />} />
          <Route
            exact
            path="/signup"
            element={<SignupForm signup={signup} />}
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/movies" element={<Movie />} />
          <Route path="/tvshows" element={<TVshow />} />
          <Route path="/edit-profile" element={<Profile />} />
          <Route path="/mylist" element={<UserList />} />
        </Route>
        {/* Add more later */}
        <Route path="*" element={<h1>404! ERROR</h1>} />
      </Routes>
    </Container>
  );
};

export default RouterApp;
