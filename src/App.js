import React, { Component } from 'react';
import './App.css';
import LocationsList from './components/LocationsList'

class App extends Component {
  locations = [
    {
      id: '0',
      title: 'Panagia',
      lat: 40.730162,
      long: 24.729016
    },
    {
      id: '1',
      title: 'Chrisi Ammoudia',
      lat: 40.729866,
      long: 24.758319
    },
    {
      id: '2',
      title: 'Limenaria',
      lat: 40.627413,
      long: 24.574206
    },
    {
      id: '3',
      title: 'Thasos',
      lat: 40.775314,
      long: 24.709014
    },
    {
      id: '4',
      title: 'Aliki',
      lat: 40.60465,
      long: 24.730073
    }
  ];

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
          <LocationsList
            locations={this.locations}
          />
        </nav>
        <main role="main">
          <p>This is where the map goes</p>
        </main>
      </div>
    );
  }
}

export default App;
