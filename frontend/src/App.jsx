import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Index from './pages/index';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import ManageProjects from "./pages/manage_projects";
import Assignments from './pages/assignments';
import Profile from './pages/profile';
import Settings from "./pages/settings";
import NotFound from './pages/notfoud';


export default class App extends Component {  
  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path = "/"               element = { <Index/> }              />
            <Route path = "/register"       element = { <Register/> }           />
            <Route path = "/login"          element = { <Login/> }              />
            <Route path = "/logout"         element = { <Logout/> }             />
            <Route path = "/dashboard"      element = { <Dashboard/> }          />
            <Route path = "/profile"        element = { <Profile/> }            />
            <Route path = "/settings"       element = { <Settings/> }           />
            <Route path = "/projects"       element = { <Projects/> }           />
            <Route path = "/project/:id"    element = { <Projects/> }           />
            <Route path = "/manageprojects" element = { <ManageProjects/> }     />
            <Route path = "/assignments"    element = { <Assignments/> }        />
            <Route path = "*"               element = { <NotFound/> }           />
          </Routes>
        </Router>
      </>
    );
  }
}