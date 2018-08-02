import React, { Component } from 'react';
import './App.css';
import LocationsList from './components/LocationsList'

class App extends Component {
  openNav() {
    document.querySelector('nav').style.transition = '0.4s';
    document.querySelector('nav').classList.add('nav-open');
    window.setTimeout(() => {
      document.querySelector('nav').style.transition = 'none';
    }, 400)
  }

  closeNav() {
    document.querySelector('nav').style.transition = '0.4s';
    document.querySelector('nav').classList.remove('nav-open');
    window.setTimeout(() => {
      document.querySelector('nav').style.transition = 'none';
    }, 400)
  }

  render() {
    return (
      <div>
        <header role="banner">
          <h1>Udacity Neighborhood Map</h1>
          <button onClick={this.openNav}>&#9776; Open menu</button>
        </header>
        <nav role="navigation">
          <button className="closebtn" onClick={this.closeNav}>&times;</button>
          <LocationsList/>
        </nav>
        <main role="main">
          <p>This is where the map goes</p>
        </main>
      </div>
    );
  }
}

export default App;
