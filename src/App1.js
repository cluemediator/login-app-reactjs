import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './HOME';
import './sidebar.css'
import gen  from './gen.png';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get('http://localhost:4000/verifyToken?token=${token}').then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div
    class="bg_image"
        style={{
          backgroundImage: 'url('+gen+')',
          backgroundSize: "cover",
          height: "100vh",
        
        }}>
    
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
          
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
