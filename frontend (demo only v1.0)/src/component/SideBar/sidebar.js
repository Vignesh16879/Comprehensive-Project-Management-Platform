import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.css';

// Icons for the sidebar
import HomeIcon from '@mui/icons-material/Home';
import SpeedIcon from '@mui/icons-material/Speed';
import ProjectIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import profileimage from "./Subtract.png";
const username = "Anmol";

const projects = [
  { id: 1, name: 'Project Alpha', icon: <ProjectIcon /> },
  { id: 2, name: 'Project Beta', icon: <ProjectIcon /> },
  { id: 3, name: 'Project Gamma', icon: <ProjectIcon /> },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="sidebar-links-top">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">
            <HomeIcon />
            {isOpen && <span>Home</span>}
          </Link>
        </li>
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">
            <SpeedIcon />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        {projects.map((project) => (
          <li
            key={project.id}
            className={location.pathname === `/project/${project.id}` ? 'active' : ''}
          >
            <Link to={`/project/${project.id}`}>
              {project.icon}
              {isOpen && <span>{project.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <hr/>
      <div className='d-flex flex-column flex-shrink-0 p-3'>
        <div className="dropdown d-flex align-items-center mt-auto">
          <a href="#home" className="d-flex align-items-center  text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={ profileimage } alt="" width="32" height="32" className="rounded-circle me-2" />
              {isOpen && <strong>{ username }</strong>}
          </a> 
          {isOpen &&
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
                <a className="dropdown-item" href="/settings">
                    Settings
                </a>
            </li>
            <li>
                <a className="dropdown-item" href="/profile">
                    Profile
                </a>
            </li>
            <li>
                <hr className="dropdown-divider" />
            </li>
            <li>
                <a className="dropdown-item" href="/logout">
                    Sign out
                </a>
            </li>
          </ul>
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;