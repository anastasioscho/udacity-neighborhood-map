import React, { Component } from 'react'

class LocationsList extends Component {
    render() {
        const {locations} = this.props;
        return (
            <ul>
                {locations.map(location => {
                    return(
                        <li key={location.id}>{location.title}</li>
                    )
                })}
            </ul>
        )
    }
}

export default LocationsList;