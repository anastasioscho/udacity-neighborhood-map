import React, { Component } from 'react'

class LocationsList extends Component {
    render() {
        const {selectedCategory, locations, onCategoryChange} = this.props;
        
        return (
            <div>
                <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
                    <option value='all'>All places</option>
                    <option value='villages'>Villages</option>
                    <option value='beaches'>Beaches</option>
                </select>
                <ul>
                    {locations.map(location => {
                        return(
                            <li key={location.id}>{location.title}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default LocationsList;