import "./App.css";
import NavigationApp from "./routes/Navigation";
import RouterApp from "./routes/Routes";
import { useState, useEffect } from "react";
import backendAPI from "./helper/api";
import UserContext from "./auth/UserContext";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./hooks/useLocalStorage";

export const TOKEN_STORAGE_ID = "backend_token";
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user do logout,
  // so the value of the token is a dependency for this effect.
  useEffect(() => {
    console.debug("App useEffect", "token=", token);
    const getCurrentUser = async () => {
      if (token) {
        try {
          const { username } = jwtDecode(token);
          backendAPI.token = token;
          const currentUser = await backendAPI.getUsername(username);
          setCurrentUser(currentUser);
        } catch (error) {
          console.error("Error loading user info", error);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

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

  // handles site-wide demo login
  const demo = async () => {
    try {
      let token = await backendAPI.login("demouser", "password");
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("demo failed", errors);
      return { success: false, errors };
    }
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, infoLoaded, setInfoLoaded }}
    >
      <NavigationApp logout={logout} demo={demo} />
      <RouterApp signup={signup} login={login} demo={demo} />
    </UserContext.Provider>
  );
}

export default App;
