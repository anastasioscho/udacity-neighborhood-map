import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './MarkerInformationComponent.css'

class MarkerInformationComponent extends Component {
    render() {
        return(
            <div className="location-information-wrapper">
                <h2>{this.props.marker.title}</h2>
                {this.props.message &&
                    <p>{this.props.message}</p>
                }
                {this.props.description &&
                    <p>{this.props.description}</p>
                }
                {this.props.image &&
                    <img
                        className="location-image"
                        src={this.props.image}
                        alt={this.props.imageDescription}
                    />
                }
            </div>
        );
    }
}

MarkerInformationComponent.propTypes = {
    marker: PropTypes.object.isRequired,
    message: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    imageDescription: PropTypes.string
}

export default MarkerInformationComponent;