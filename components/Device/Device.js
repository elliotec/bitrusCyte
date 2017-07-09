import React from 'react';
import './Device.css';

export default class Device extends React.Component {
  render () {
    return (
      <div className="product-container">
          <h4 className="product-name">{this.props.name}</h4>
          <p className="product-type">{this.props.sizetypecolor}</p>
      </div>
    );
  }
}
