import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown, Menu } from "semantic-ui-react";
import UserContext from "../auth/UserContext";
const NavigationApp = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUsers= ", currentUser);

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
                  <Dropdown.Item as={Link} to="/" onClick={logout}>Logout</Dropdown.Item>
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
          </>
        )}
      </Menu.Menu>
      {/* Add protected route for movie/tv show later */}
    </Menu>
  );
};

export default NavigationApp;
