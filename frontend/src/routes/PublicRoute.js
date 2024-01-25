import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { currentUser } = useContext(UserContext);
  console.debug(
    "Public",
    "currentUser=",
    currentUser
  );

  if (currentUser) return <Navigate replace to="/" />;

  return (
      <Outlet />
  );
};

export default PublicRoute;