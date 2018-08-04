import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationsList extends Component {
    render() {
        const {selectedCategory, locations, onCategoryChange, onLocationClick} = this.props;
        
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
                            <li key={location.id}>
                                <button onClick={() => onLocationClick(location)}>{location.title}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

LocationsList.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onLocationClick: PropTypes.func.isRequired
}

export default LocationsList;