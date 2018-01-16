import React from "react";
import { inject, observer } from "mobx-react";

const Product = ({ products, response }) => {
  const product = products[response.params.id];
  return product ? (
    <div>Product: {product.name}</div>
  ) : (
    <div>No product with id {response.params.id} was found</div>
  );
};

export default inject("products")(observer(Product));
