import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './login.css';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button onClick={loginWithRedirect} className="loginBtn">Log in</button>
  );
}


export default LoginButton;