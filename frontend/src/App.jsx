import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Index from './pages/index';
import Login from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import Profile from './pages/profile';
import NotFound from './pages/notfoud';


class App extends Component {  
  state = {
    todos: []
  };
  
  backend_ip = "192.168.0.150";
  backend_port = "7271";

  componentDidMount() {
    // axios.get(`http://${backend_ip}:${this.backend_port}/api/todos`)
    //   .then(res => {
    //     const todos = res.data;
    //     this.setState({ todos });
    //   });
  }


  render() {
    return (
      <>
        <Router>
          <Routes>
            <Route path = "/"           element = { <Index/> }        />
            <Route path = "/register"   element = { <Register/> }     />
            <Route path = "/login"      element = { <Login/> }        />
            <Route path = "/logout"     element = { <Logout/> }       />
            <Route path = "/dashboard"  element = { <Dashboard/> }         />
            <Route path = "/profile"    element = { <Profile/> }      />
            <Route path = "/projects"   element = { <Projects/> }     />
            <Route path = "*"           element = { <NotFound />}     />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
