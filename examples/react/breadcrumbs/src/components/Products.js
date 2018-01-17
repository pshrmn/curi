import React from "react";
import { Link } from "@curi/react";

const Products = ({ response: { data }, router }) => (
  <div>
    <h1>Products Page</h1>
    <h2>Categories</h2>
    <ul>
      {data.map(category => (
        <li key={category}>
          <Link to="Category" params={{ category }}>
            {router.addons.title("Category", { category })}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Products;
