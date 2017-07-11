import React from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import { connect } from 'react-redux';
import { fetchContentful } from 'pages/_template.jsx';
import Header from 'components/Header/Header';
import Devices from 'components/Devices/Devices.js';

class Admin extends React.Component {
 constructor(props) {
  super(props);
 }
  componentDidMount() {
    this.props.dispatch(fetchContentful())
  }
  render () {
    return (
        <div>
          <Helmet
            title={config.siteTitle}
          />
          <Header />
          { !this.props.allDevices ? <h1>Loading...</h1> :
            <div>
                <h2>Admin</h2>
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
export default connect(mapStateToProps)(Admin)
