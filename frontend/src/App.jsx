import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Index from "./pages/Index/index";
import Register from "./pages/Register/register";
import Login from "./pages/Login/login";
import Logout from "./pages/Logout/logout";
import Dashboard from "./pages/Dashboard/dashboard";
import Profile from "./pages/Profile/profile";
import Projects from "./pages/Projects/projects";
import Project from "./pages/Project/project";
import Assignments from "./pages/Assignments/assignments";
import AddProject from "./pages/AddProject/addproject";
import ManageProjects from "./pages/ManageProjects/manage_projects";
import Inbox from "./pages/Inbox/inbox";
import Transactions from "./pages/Transactions/transactions";
import Settings from "./pages/Settings/settings";
import NotFound from "./pages/NotFound/notfoud";


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
            <Route path = "/projects"       element = { <Projects/> }           />
            <Route path = "/project/:id"    element = { <Project/> }            />
            
            <Route path = "/assignments"    element = { <Assignments/> }        />
            <Route path = "/manageprojects" element = { <ManageProjects/> }     />
            <Route path = "/addproject"     element = { <AddProject/> }         />
            
            <Route path = "/inbox"          element = { <Inbox/> }              />
            <Route path = "/transactions"   element = { <Transactions/> }       />
            <Route path = "/profile"        element = { <Profile/> }            />
            <Route path = "/settings"       element = { <Settings/> }           />
            
            <Route path = "*"               element = { <NotFound/> }           />
          </Routes>
        </Router>
      </>
    );
  }
}