import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import './sidebar.css'
function Buttonlog() {
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
    <div>
    
    <div className="Buttonlog">
      <BrowserRouter>
        <div >
          <div className="header">
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content">
            <Switch>
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

export default Buttonlog;
