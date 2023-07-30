import React, { useEffect, useState } from 'react';
import './middlepart.css';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../login/LoginButton';

import { ApolloProvider } from '@apollo/client';
import client from '../../apollo';
import QuestionList from '../questionlist/NewQuestionList';

const MiddlePart = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  

  const [colors, setColors] = useState({ color1: '', color2: '', color3: '' });

  useEffect(() => {
    generateRandomColors();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomColors = async () => {

    setColors({
      color1: getRandomColor(),
      color2: getRandomColor(),
      color3: getRandomColor(),
    });
     
    // console.log(data);
  };

  return (
    <>
      <div className="middlePart">
        <center>
          <h2 className='homeHeadingText'>Welcome to ReactConnect!👋🏻</h2>
          <br />
          <br />
          <br />
          <div className="detailsContainer">
            <h3 className='paraText'>"ReactConnect" is a cutting-edge collaborative real-time code editor that revolutionizes the way developers work together on coding projects. Inspired by the fluidity of Google Docs, this platform empowers multiple developers to connect to the same React codebase simultaneously, enabling seamless collaboration and instant feedback like never before.</h3>
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt="ReactConnect" className='devImage' />
          </div>
          <br /><br />
          <button
            className="gradient-button glow-animation"
            style={{
              '--color1': colors.color1,
              '--color2': colors.color2,
              '--color3': colors.color3,
            }}
            onClick={generateRandomColors}
          >
            Let's get started 🔥
          </button>

          <br/>
          <br/>
{isAuthenticated? <></> : <><button onClick={() => loginWithRedirect()} className='loginBtn'>Log In</button></>}

 
        </center>
        <br />
      </div>
    </>
  );
}

export default MiddlePart;