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
        const markers = locations.map((currentLocation) => {
            return new window.google.maps.Marker({
                position: {lat: currentLocation.lat, lng: currentLocation.long},
                title: currentLocation.title,
                id: currentLocation.id
            });
        });

        markers.forEach((marker) => {
            marker.addListener('click', () => {
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
            });
        });

        return markers;
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
}

MapComponent.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MapComponent;