import React from 'react';
import { NavLink } from 'react-router-dom';
import './LeftSidebar.css';

const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className='side-nav'>
        <NavLink to="/" className="side-nav-links" activeClass="active">
          <p>Home</p>
        </NavLink>
        <div className='side-nav-div'>
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink to="/Questions" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink to="/tags" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>Tags</p>
          </NavLink>
          <NavLink to="/Users" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>Users</p>
          </NavLink>
          <NavLink to="/community/dashboard" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>Community</p>
          </NavLink>
          <NavLink to="/create-post" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>Add Post</p>
          </NavLink>
          <NavLink to="/friendlist" className="side-nav-links" activeClass="active">
            <p style={{ paddingLeft: "10px" }}>See Friends</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default LeftSidebar;
