import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MarkerInformationComponent extends Component {
    render() {
        return(
            <div>
                <p>{this.props.marker.title}</p>
                {this.props.message &&
                    <p>{this.props.message}</p>
                }
                {this.props.description &&
                    <p>{this.props.description}</p>
                }
                {this.props.image &&
                    <img
                        src={this.props.image}
                        alt={`Photo of ${this.props.marker.title}`}
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
    image: PropTypes.string
}

export default MarkerInformationComponent;