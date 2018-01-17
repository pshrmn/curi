import React from "react";
import Breadcrumbs from "./Breadcrumbs";

const Product = ({ response: { data, params } }) => (
  <div>
    <Breadcrumbs name="Product" params={params} />
    <h1>{data.name}</h1>
    <p>{data.description}</p>
  </div>
);

export default Product;
