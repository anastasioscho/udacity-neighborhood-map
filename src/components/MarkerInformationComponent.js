import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MarkerInformationComponent extends Component {
    render() {
        return(
            <div>
                <p>{this.props.marker.title}</p>
            </div>
        );
    }
}

MarkerInformationComponent.propTypes = {
    marker: PropTypes.object.isRequired
}

export default MarkerInformationComponent;