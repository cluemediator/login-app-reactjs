import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import Login from './Login';
import './sidebar.css'
import gen  from './gen.png';
import Home from './HOME'
import Log from './buttonlog'

function App() {
  
  return (
    <div
    class="bg_image"
        style={{
          backgroundImage: 'url('+gen+')',
          backgroundSize: "cover",
          height: "100vh",
        }}>
    
    <div >
      <BrowserRouter>
      
        <div>
        <div style={{ display: "flex" }}>
        <button
         style={{
          position: 'absolute',
          left: 200,
          top: 40,
           }}>
         <a href="/login">login </a>
          </button>
          </div>
          
          <div className="header">
       
            <Menu>
            <a  href="/">Home</a>
            <a  href="/movie">Movie</a>
            <a  href="/Actors">Actors</a>
            <a  href="/Producer">Producer</a>
            <a href="/Graf connection"> Graph connection </a>
            </Menu>
          </div>

          <div className="content">
            <Switch>
              <Route exact  path="/" to={Home} />
              <Route  path="/login" component={Log} />
              <Route path="/movie" component={Login} />
              <Route path="/Actors" component={Login} />
              <Route path="/Producer" component={Login} />
              <Route path="/Graf connection" component={Login} />

            </Switch>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
