import React from 'react'
import PropTypes from 'prop-types'
import './LocationsListComponent.css'

function LocationsListComponent(props) {
    const {selectedCategory, locations, onCategoryChange, onLocationClick, selectedLocation} = props;
        
    return (
        <div className="locations-list-container">
            <select role="search" value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
                <option value='all'>All places</option>
                <option value='villages'>Villages</option>
                <option value='beaches'>Beaches</option>
            </select>
            <ul>
                {locations.map(location => {
                    return(
                        <li key={location.id}>
                            <button
                                onClick={() => onLocationClick(location)}
                                className={selectedLocation && selectedLocation.id === location.id ? 'selected-location' : null}
                                aria-current={selectedLocation && selectedLocation.id === location.id ? 'true' : null}
                            >
                                    {location.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

LocationsListComponent.propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onLocationClick: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object
}

export default LocationsListComponent;