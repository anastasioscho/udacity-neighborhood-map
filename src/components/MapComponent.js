import React, { Component } from 'react'
import loadjs from 'loadjs'
import PropTypes from 'prop-types'

class MapComponent extends Component {
    state = {
        markers: []
    }

    componentDidMount() {
        loadjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC4j2OsSiIGHMKVka01EsmJV6VG88XwvG4', 'load-google-maps-api');
        loadjs.ready('load-google-maps-api', () => {
            const map = new window.google.maps.Map(this.refs.map, {
                center: {lat: 40.696855, lng: 24.656471},
                zoom: 11
            });

            const markers = this.markersFromLocations(this.props.locations);
            this.addMarkersToMap(markers, map);

            this.setState({map, markers});
        });
    }

    shouldComponentUpdate(nextProps) {
        return (this.props !== nextProps);
    }

    componentDidUpdate(prevProps) {
        const markers = this.updatedMarkers(prevProps);

        if (this.state.map && markers) {
            this.clearMarkersFromMap(this.state.markers);
            this.addMarkersToMap(markers, this.state.map);
            this.setState({markers});
        }
    }

    render() {
        return (
            <div ref="map" role="application" aria-label='A map showing the locations' style={{height: '100vh', width: '100%'}}>This is where the map goes</div>
        )
    }

    updatedMarkers(prevProps) {
        // Returns a new set of markers if the locations are different

        const currentLocations = this.props.locations;
        const previousLocations = prevProps.locations;

        if (currentLocations === previousLocations && this.state.markers.length > 0) {
            return undefined
        }

        return this.markersFromLocations(currentLocations);
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