import React from "react";
import "./leaderboard.css";
import NavBar from "../../components/navbar/Navbar";

const leaderboardData = [
  {
    id: 1,
    name: "John Doe",
    points: 100,
    image: "https://example.com/user1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    points: 85,
    image: "https://example.com/user2.jpg",
  },
  // Add more user data here
];

const Leaderboard = () => {
  return (

    <>
    <NavBar/>
    <div className="leaderboard">

      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.image} alt={user.name} />
              </td>
              <td>{user.name}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Leaderboard;