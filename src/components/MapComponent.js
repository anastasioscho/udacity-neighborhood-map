import React, { Component } from 'react'
import loadjs from 'loadjs'
import PropTypes from 'prop-types'
import MarkerInformationComponent from './MarkerInformationComponent'
import ReactDOMServer from 'react-dom/server'

class MapComponent extends Component {
    componentDidMount() {
        loadjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyC4j2OsSiIGHMKVka01EsmJV6VG88XwvG4', 'load-google-maps-api');
        loadjs.ready('load-google-maps-api', () => {
            this.map = new window.google.maps.Map(this.refs.map, {
                center: {lat: 40.696855, lng: 24.656471},
                zoom: 11
            });
            this.infoWindow = new window.google.maps.InfoWindow();
            this.infoWindow.addListener('closeclick', () => {
                this.infoWindow.marker = null;
            });

            this.markers = this.markersFromLocations(this.props.locations);
            this.addMarkersToMap(this.markers, this.map);
            this.setMapBounds();
        });
    }

    shouldComponentUpdate(nextProps) {
        // If there is a different set of locations, redraw the markers.
        if (!this.areArraysEqual(this.props.locations, nextProps.locations)) {
            this.clearMarkersFromMap(this.markers);
            this.markers = this.markersFromLocations(nextProps.locations);
            this.addMarkersToMap(this.markers, this.map);
            this.setMapBounds();
        }

        // If there is a selected location, open the InfoWindow of the corresponding marker.
        const locationMarker = this.markerForLocation(nextProps.selectedLocation);
        if (locationMarker) {
            this.openInfoWindow(locationMarker);
        }

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
        const markers = locations.map((currentLocation) => {
            return new window.google.maps.Marker({
                position: {lat: currentLocation.lat, lng: currentLocation.long},
                title: currentLocation.title,
                id: currentLocation.id
            });
        });

        markers.forEach((marker) => {
            marker.addListener('click', () => {
                this.openInfoWindow(marker);
            });
        });

        return markers;
    }

    openInfoWindow(marker) {
        if (this.infoWindow.marker !== marker) {
            this.animateMarker(marker);
            this.infoWindow.marker = marker;
            this.infoWindow.setContent(ReactDOMServer.renderToString(
                <MarkerInformationComponent
                    marker={marker}
                    message='Please wait while we are looking for more information'
                />
            ));
            this.infoWindow.open(this.map, marker);
            this.updateInfoWindowWithAdditionalInformation(marker);
        }
    }

    markerForLocation(location) {
        if (location) {
            for (const marker of this.markers) {
                if (location.id === marker.id) return marker;
            }
        }

        return undefined
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

    setMapBounds() {
        const bounds = new window.google.maps.LatLngBounds();

        for (const marker of this.markers) {
            bounds.extend(marker.position);
        }

        this.map.fitBounds(bounds);
    }

    updateInfoWindowWithAdditionalInformation(marker) {
        const url = `https://explore-thassos.com/api/getPlace.php?id=${marker.id}`;

        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            if (this.infoWindow.marker === marker) {
                this.infoWindow.setContent(ReactDOMServer.renderToString(<MarkerInformationComponent
                    marker={marker}
                    description={data.place.description}
                    image={data.place.image}
                />));
            }
        }).catch(() => {
            if (this.infoWindow.marker === marker) {
                this.infoWindow.setContent(ReactDOMServer.renderToString(<MarkerInformationComponent
                    marker={marker}
                    message='There was an error trying to get additional information'
                />));
            }
        });
    }

    animateMarker(marker) {
        if (marker.getAnimation()) return;

        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        window.setTimeout(() => {
            marker.setAnimation(null);
        }, 700 * 2);
    }

    areArraysEqual(array1, array2) {
        // if any of the arrays is a falsy value, return.
        if (!array1 || !array2) return false;

        // Compare lengths - can save a lot of time.
        if (array1.length !== array2.length) return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays.
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                // Recurse into the nested arrays.
                if (!array1[i].equals(array2[i])) return false;
            } else if (array1[i] !== array2[i]) {
                // Warning: two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        
        return true;
    }
}

MapComponent.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedLocation: PropTypes.object
}

export default MapComponent;