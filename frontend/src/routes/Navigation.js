import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import UserContext from "../auth/UserContext";
const NavigationApp = ({ logout, demo }) => {
  const { currentUser } = useContext(UserContext);

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
    }

  return (
    <Menu pointing secondary>
      <Menu.Item as={NavLink} to="/">
        Streaming App
      </Menu.Item>
      <Menu.Menu position="right">
        {/* <Menu.Item as={NavLink} to="/">
          Home
        </Menu.Item> */}
        {currentUser ? (
          <>
            <Menu.Item as={NavLink} to="/movies">
              Movie
            </Menu.Item>
            <Menu.Item as={NavLink} to="/tvshows">
              TV Show
            </Menu.Item>
            <Menu.Item as={NavLink} to="/mylist">
              My List
            </Menu.Item>
            <Menu.Item>
              <Dropdown
                text={`Hello, ${
                  currentUser.first_name || currentUser.username
                }`}
                pointing
              >
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/edit-profile">
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/" onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            {/* <Menu.Item as={Link} to="/" onClick={logout}>
              Logout - (Hi {currentUser.first_name || currentUser.username})
            </Menu.Item> */}
          </>
        ) : (
          <>
            <Menu.Item as={NavLink} to="/login">
              Login
            </Menu.Item>
            <Menu.Item as={NavLink} to="/signup">
              Sign Up
            </Menu.Item>
            <Menu.Item onClick={handleSubmit}>
              Demo Login Without Account
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
      {/* Add protected route for movie/tv show later */}
    </Menu>
  );
};

export default NavigationApp;
