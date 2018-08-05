import React, { Component } from 'react';
import './App.css';
import LocationsListComponent from './components/LocationsListComponent'
import MapComponent from './components/MapComponent'

class App extends Component {
  locations = [
    {
      id: '0',
      title: 'Panagia',
      lat: 40.730085,
      long: 24.727079,
      category: 'villages'
    },
    {
      id: '1',
      title: 'Chrisi Ammoudia',
      lat: 40.726455,
      long: 24.756618,
      category: 'beaches'
    },
    {
      id: '2',
      title: 'Limenaria',
      lat: 40.628268,
      long: 24.57621,
      category: 'villages'
    },
    {
      id: '3',
      title: 'Limenas',
      lat: 40.776696,
      long: 24.709071,
      category: 'villages'
    },
    {
      id: '4',
      title: 'Giola',
      lat: 40.586365,
      long: 24.678652,
      category: 'beaches'
    }
  ];

  toggleNav() {
    this.refs.menu.classList.toggle('nav-open');
    
    if (!this.refs.menu.classList.contains('nav-open')) {
      this.refs.menuButton.focus();
    } else {
      window.setTimeout(() => {
        this.refs.closeButton.focus();
      }, 100);
    }
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
    this.toggleNav();
  }

  render() {
    return (
      <div className="wrapper">
        <header role="banner">
          <div className="header-title-wrapper">
            <h1>Best of Thassos</h1>
            <p>Thank you <a href="https://explore-thassos.com" target="_blank" rel="noopener noreferrer">explore-thassos</a> for providing us the data!</p>
          </div>
          <button ref="menuButton" onClick={() => this.toggleNav()}>&#9776;</button>
        </header>
        <nav ref="menu">
          <button ref="closeButton" className="closebtn" onClick={() => this.toggleNav()}>&times;</button>
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
