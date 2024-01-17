import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
const NavigationApp = () => {
    return (
        <Menu pointing secondary>
            <Menu.Item as={NavLink} to="/" exact>
                Brand
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item as={NavLink} to="/" exact>
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} to="/login">
                    Login
                </Menu.Item>
                <Menu.Item as={NavLink} to="/signup">
                    Sign Up
                </Menu.Item>
            </Menu.Menu>
            {/* Add protected route for movie/tv show later */}
        </Menu>
    )
}

export default NavigationApp;