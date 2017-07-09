import React from 'react';
import Device from 'components/Device/Device';
import './Devices.css';

export default class Devices extends React.Component {
  render () {
    return (
      <section className="featured-products">
        <h2 className="featured-products-header">Devices</h2>
        <div className="featured-flex">
          {this.props.products.map(product =>
              <Device
                key={product.sys.id}
                id={product.sys.id}
                name={product.productName}
                productDescription={product.productDescription}
                quantity={product.quantity}
                sizetypecolor={product.sizetypecolor}
                price={product.price}
                imageUrl={product.imageUrl}
              />
          )}
        </div>
      </section>
    );
  }
}
