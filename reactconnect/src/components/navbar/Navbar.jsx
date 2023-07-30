import React from 'react'
import './navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <nav className="navbar navbar-expand-lg" id="navbar">
          {/* <nav className="navbar" id="navbar"> */}
          {/* <div className="container-fluid"> */}
          <a className="navbar-brand" href="#">ReactConnect</a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <a className="nav-link" href="#">Leaderboard</a>
              </li>

              <li className="nav-item">
                <Link to="/blogs" className="nav-link">Blogs</Link>
              </li>

              <li className="nav-item">
                <Link to="/forums" className="nav-link">Forums</Link>
              </li>

              <li className="nav-item">
                <Link to='/create-space'><button className="createSpaceBtn" >Create Space</button>
                </Link>
              </li>

              <div className="spacer"></div>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/20625/avatar-bg.png" height="30px" width="30px" classNameName='myProfile' />
                </a>
              </li>
            </ul>


          </div>

          {/* </div> */}
        </nav>
      </div>

    </>
  )
}

export default NavBar;
