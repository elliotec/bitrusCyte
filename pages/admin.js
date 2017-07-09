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
          { !this.props.allProducts ? <h1>Loading...</h1> :
            <div>
                <h2>Admin</h2>
                <Devices
                    products={this.props.featured}
                />
            </div>
          }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
    featured: state.featured,
    justArrived: state.justArrived,
    seasonal: state.seasonal,
    bundle: state.bundle
  }
}
// Connected Component
export default connect(mapStateToProps)(Admin)
