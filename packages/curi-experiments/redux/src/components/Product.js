import React from 'react';
import { connect } from 'react-redux';

const Product = (props) => (
  props.product
    ? <div>Product: { props.product.name }</div>
    : <div>No product with id {props.params.id} was found</div>
);

export default connect(
  (store, ownProps) => {
    const productId = ownProps.params.id;
    return {
      product: store[productId]
    };
  }
)(Product);
