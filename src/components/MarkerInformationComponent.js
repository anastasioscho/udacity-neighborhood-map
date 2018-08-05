import React from 'react'
import PropTypes from 'prop-types'
import './MarkerInformationComponent.css'

function MarkerInformationComponent(props) {
    return(
        <div className="location-information-wrapper">
            <h2>{props.marker.title}</h2>
            {props.message &&
                <p>{props.message}</p>
            }
            {props.description &&
                <p>{props.description}</p>
            }
            {props.image &&
                <img
                    className="location-image"
                    src={props.image}
                    alt={props.imageDescription}
                />
            }
        </div>
    );
}

MarkerInformationComponent.propTypes = {
    marker: PropTypes.object.isRequired,
    message: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    imageDescription: PropTypes.string
}

export default MarkerInformationComponent;