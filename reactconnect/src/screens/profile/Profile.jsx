import React, { useEffect } from 'react';
import './profile.css'; // Import the CSS file for styling
import NavBar from '../../components/navbar/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  // If you want to perform any additional actions on component mount, you can use useEffect
  useEffect(() => {
    // Your additional logic here, if needed
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for Auth0 to load user data
  }

  if (!isAuthenticated) {
    loginWithRedirect(); // Redirect to login page if the user is not authenticated
    return null; // You can return null or any other UI element to show while redirecting
  }

  return (
    <>
      <NavBar />
      <br />
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.picture} alt="Profile" className="profile-image" />
          <br />
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>

        <div className="profile-details">
          <p className="sessions-attended">Sessions Attended: 12</p>
          <p className="num-of-badges">Number of Badges: 12</p>
          <br />
          <p className="title">The Merge Master</p>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default UserProfile;
