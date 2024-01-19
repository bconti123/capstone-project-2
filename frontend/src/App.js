import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavigationApp from "./routes/Navigation";
import RouterApp from "./routes/Routes";
import { useState } from "react";
import backendAPI from "./helper/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user do logout,
  // so the value of the token is a dependency for this effect.
  // TODO CODE

  // Handles site-wide logout
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  // Handles site-wide signup.
  const signup = async (signupData) => {
    try {
      const { username, password, firstName, lastName, email } = signupData;
      let token = await backendAPI.signup(
        username,
        password,
        firstName,
        lastName,
        email
      );
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  };

  // Handles site-wide login.
  const login = async (loginData) => {
    try {
      const { username, password } = loginData;
      let token = await backendAPI.login(username, password);
      setToken(token);
      // console.log(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };
  return (
    <BrowserRouter>
      <NavigationApp logout={logout} />
      <RouterApp signup={signup} login={login} />
    </BrowserRouter>
  );
}

export default App;
