import React from "react";
import { Link } from "@curi/react-dom";

const Preview = ({ color }) => (
  <div
    style={{
      width: 20,
      height: 20,
      background: color || "#666"
    }}
  />
);

const Product = ({ response }) => (
  <div>
    Paint color: {response.location.state.name || "Unknown"}
    <Preview color={response.params.color} />
    <Link
      name="Product Detail"
      params={response.params}
      state={{ modal: true, name: "Dark Slate Blue" }}
    >
      Detail View
    </Link>
  </div>
);

export default Product;
