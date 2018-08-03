import React, { Component } from 'react'
import loadjs from 'loadjs'
import PropTypes from 'prop-types'

class MapComponent extends Component {
    componentDidMount() {
        loadjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC4j2OsSiIGHMKVka01EsmJV6VG88XwvG4', 'load-google-maps-api');
        loadjs.ready('load-google-maps-api', () => {
            this.map = new window.google.maps.Map(this.refs.map, {
                center: {lat: 40.696855, lng: 24.656471},
                zoom: 11
            });

            this.markers = this.markersFromLocations(this.props.locations);
            this.addMarkersToMap(this.markers, this.map);
        });
    }

    shouldComponentUpdate(nextProps) {
        this.clearMarkersFromMap(this.markers);
        this.markers = this.markersFromLocations(nextProps.locations);
        this.addMarkersToMap(this.markers, this.map);

        return false;
    }

    render() {
        console.log('MapComponent', 'I just rendered');
        return (
            <div ref="map" role="application" aria-label='A map showing the locations' style={{height: '100vh', width: '100%'}}>This is where the map goes</div>
        )
    }

    /* Helper Functions */

    markersFromLocations(locations) {
        return locations.map((currentLocation) => {
            return new window.google.maps.Marker({
                position: {lat: currentLocation.lat, lng: currentLocation.long},
                title: currentLocation.title
            });
        });
    }

    addMarkersToMap(markers, map) {
        markers.forEach((marker) => {
            marker.setMap(map);
        });
    }

    clearMarkersFromMap(markers) {
        markers.forEach((marker) => {
            marker.setMap(null);
        });
    }
}

MapComponent.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MapComponent;