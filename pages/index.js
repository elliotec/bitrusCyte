import React from 'react';
import { config } from 'config';
import { connect } from 'react-redux';
import { fetchContentful } from 'pages/_template.jsx';
import Devices from 'components/Devices/Devices.js';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(fetchContentful())
    }
    render () {
        return (
            <div>
                { !this.props.devices ? <marquee>loading... or broken</marquee> :
                        <div>
                            <Devices
                                devices={this.props.devices}
                                dispatch={this.props.dispatch}
                            />
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    devices: state.devices
  }
}

// Connected Component
export default connect(mapStateToProps)(Index)
