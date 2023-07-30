// UserProfile.jsx

import React, { useEffect, useState } from 'react';
import './profile.css'; // Import the CSS file for styling
import NavBar from '../../components/navbar/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

const ChallengesTile = () => {
  // Sample challenges data
  const [challenges, setChallenges] = useState([
    { id: 1, title: 'Challenge 1', status: 'completed' },
    { id: 2, title: 'Challenge 2', status: 'pending' },
    { id: 3, title: 'Challenge 3', status: 'completed' },
    { id: 4, title: 'Challenge 4', status: 'completed' },
    { id: 5, title: 'Challenge 5', status: 'pending' },
  ]);

  const [isExpanded, setIsExpanded] = useState(false);

  const completedChallenges = challenges.filter(challenge => challenge.status === 'completed');
  const pendingChallenges = challenges.filter(challenge => challenge.status === 'pending');

  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`challenges-tile ${isExpanded ? 'expanded' : ''}`}>
      <h2 onClick={handleToggleExpand}>Challenges</h2>
      {isExpanded && (
        <>
          <div className="challenges-completed">
            <h3>Completed</h3>
            <ul>
              {completedChallenges.map(challenge => (
                <li key={challenge.id}>{challenge.title}</li>
              ))}
            </ul>
          </div>
          <div className="challenges-pending">
            <h3>Pending</h3>
            <ul>
              {pendingChallenges.map(challenge => (
                <li key={challenge.id}>{challenge.title}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const UserProfile = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect } = useAuth0();

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
      <center>
      <ChallengesTile />
      </center>
    </>
  );
};

export default UserProfile;
