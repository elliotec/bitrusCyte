import React from 'react';
import { config } from 'config';
import { connect } from 'react-redux';
import { fetchContentful } from 'pages/_template.jsx';
import Header from 'components/Header/Header';
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
                { !this.props.devices ? <sm>Loading... or broken</sm> :
                        <div>
                            <Devices
                                devices={this.props.devices}
                            />
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    allDevices: state.allDevices,
    devices: state.devices
  }
}

// Connected Component
export default connect(mapStateToProps)(Index)
