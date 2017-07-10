import React from 'react';
import Device from 'components/Device/Device';
import './Devices.css';

export default class Devices extends React.Component {
  render () {
    return (
      <section className="featured-products">
        <h2 className="featured-products-header">Devices</h2>
        <div className="featured-flex">
          {this.props.devices.map(device =>
              <Device
                key={device.sys.id}
                id={device.sys.id}
                name={device.productName}
                type={device.sizetypecolor}
              />
          )}
        </div>
      </section>
    );
  }
}
