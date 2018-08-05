import React, { Component } from 'react';
import './App.css';
import LocationsListComponent from './components/LocationsListComponent'
import MapComponent from './components/MapComponent'

class App extends Component {
  locations = [
    {
      id: '0',
      title: 'Panagia',
      lat: 40.730162,
      long: 24.729016,
      category: 'villages'
    },
    {
      id: '1',
      title: 'Chrisi Ammoudia',
      lat: 40.729866,
      long: 24.758319,
      category: 'beaches'
    },
    {
      id: '2',
      title: 'Limenaria',
      lat: 40.627413,
      long: 24.574206,
      category: 'villages'
    },
    {
      id: '3',
      title: 'Thasos',
      lat: 40.775314,
      long: 24.709014,
      category: 'villages'
    },
    {
      id: '4',
      title: 'Aliki',
      lat: 40.60465,
      long: 24.730073,
      category: 'beaches'
    }
  ];

  openNav() {
    this.refs.menu.style.transition = '0.4s';
    this.refs.menu.classList.add('nav-open');
    window.setTimeout(() => {
      this.refs.menu.style.transition = 'none';
    }, 400);
  }

  closeNav() {
    this.refs.menu.style.transition = '0.4s';
    this.refs.menu.classList.remove('nav-open');
    window.setTimeout(() => {
      this.refs.menu.style.transition = 'none';
    }, 400);
  }

  state = {
    selectedCategory: 'all',
    selectedLocation: null
  }

  locationsForCategory(category) {
    if (category === 'all') {
      return this.locations;
    }

    return this.locations.filter(location => {
      return location.category === category;
    })
  }

  handleCategoryChange = (selectedCategory) => {
    this.setState({selectedCategory, selectedLocation: null});
  }

  handleLocationClick = (selectedLocation) => {
    this.setState({selectedLocation});
    this.closeNav();
  }

  render() {
    return (
      <div className="wrapper">
        <header role="banner">
          <div className="header-title-wrapper">
            <h1>Best of Thassos</h1>
            <p>Thank you <a href="https://explore-thassos.com" target="_blank">explore-thassos</a> for providing us the data!</p>
          </div>
          <button onClick={() => this.openNav()}>&#9776;</button>
        </header>
        <nav ref="menu" role="navigation">
          <button className="closebtn" onClick={() => this.closeNav()}>&times;</button>
          <LocationsListComponent
            selectedCategory={this.state.selectedCategory}
            locations={this.locationsForCategory(this.state.selectedCategory)}
            onCategoryChange={this.handleCategoryChange}
            onLocationClick={this.handleLocationClick}
          />
        </nav>
        <main role="main">
          <MapComponent
            locations={this.locationsForCategory(this.state.selectedCategory)}
            selectedLocation={this.state.selectedLocation}
          />
        </main>
      </div>
    );
  }
}

export default App;
