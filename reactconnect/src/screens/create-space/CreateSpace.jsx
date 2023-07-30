import React from 'react'
import './createspace.css'
import { useState } from 'react';
import NavBar from '../../components/navbar/Navbar'
import axios from 'axios';

const CreateSpace = () => {


  const [name, setName] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [description, setDescription] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleRepoLink = (event) => {
    setRepoLink(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleJoinSpace = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/space/${name}`);
      const { exists } = response.data;
      if (exists) {
        // c(response)
        // window.location.href = `http://localhost:3000/space/${token}/editor`;
        console.log('Space found! You can join now.');
        // Optionally, show a success message or navigate the user to the space.
      } else {
        console.log('Space not found. Please check the name and try again.');
        // Optionally, show an error message to the user.
      }
    } catch (error) {
      console.error('Failed to check space existence', error);
      // Handle the error, show an error message, or do whatever you need to do.
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/space/${name}`);
      
      const { exists } = response.data;

      if (exists) {
        console.log('Space with the same name already exists. Please choose a different name.');
        return; // Stop the submission process if the name already exists
      }

      const newBlogData = { name, repoLink, description };
      const newResponse = await axios.post('http://localhost:5000/api/space', newBlogData);
      console.log(newResponse);
      const token = newResponse.data.token;
      console.log('Space submitted!');
      // console.log(token)
      setName('');
      setRepoLink('');
      setDescription('');
      window.location.href = `http://localhost:3000/space/${token}/editor`;
    } catch (error) {
      console.error('Space not submitted', error);
    }
  };



  return (
    <>

      <div className="createSpace">

        <center>
          <NavBar />
          <br />
          <h1 className='headingText'>
            Create Virtual Space 🤖
          </h1>

          <br />



          <h4>
            Please enter the following details.
          </h4>
          <br />
          <div className="detailsNewContainer">

            <input type='text' placeholder='Space Name' className='textField' onChange={handleName} /><br />
            <input type='text' placeholder='Github Repo Link' className='textField' onChange={handleRepoLink} /><br />
            <textarea className='textField' placeholder='Description about space.' onChange={handleDescription}></textarea> <br />

            <div className="buttons">
              <button className='create-space-btn' onClick={handleSubmit}>
                Create Space
              </button>

              <button className='join-space-btn' onClick={handleJoinSpace}>Join Space</button>
            </div>



          </div>

        </center>
        <br />

      </div>

    </>
  )
}

export default CreateSpace
