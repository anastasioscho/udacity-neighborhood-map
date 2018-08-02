import React, { Component } from 'react'
import loadjs from 'loadjs'

class MapComponent extends Component {
    componentDidMount() {
        loadjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC4j2OsSiIGHMKVka01EsmJV6VG88XwvG4', 'load-google-maps-api');
        loadjs.ready('load-google-maps-api', () => {
            const map = new window.google.maps.Map(this.refs.map, {
                center: {lat: 40.696855, lng: 24.656471},
                zoom: 11
            });
            this.setState({map});
        });
    }

    render() {
        return (
            <div ref="map" role="application" aria-label='A map showing the locations' style={{height: '100vh', width: '100%'}}>This is where the map goes</div>
        )
    }
}

export default MapComponent;