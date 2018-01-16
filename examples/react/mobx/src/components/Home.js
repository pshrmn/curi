import React from "react";
import { Link } from "@curi/react";
import { inject, observer } from "mobx-react";

const ProductThumbnail = props => (
  <div className="thumbnail">
    <Link to="Product" params={{ id: props.id }}>
      {props.name}
    </Link>
  </div>
);

const Home = ({ products }) => (
  <div>
    {Object.keys(products)
      .map(key => products[key])
      .map((p, i) => <ProductThumbnail key={i} {...p} />)}
  </div>
);

export default inject("products")(observer(Home));
