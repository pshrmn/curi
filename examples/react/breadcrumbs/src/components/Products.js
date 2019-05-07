import React from "react";
import { Link, useRouter } from "@curi/react-dom";
import title from "../titleInteraction";

function Products({ response: { data } }) {
  const router = useRouter();
  const categoryRoute = router.route("Category");
  return (
    <div>
      <h1>Products Page</h1>
      <h2>Categories</h2>
      <ul>
        {data.map(category => (
          <li key={category}>
            <Link name="Category" params={{ category }}>
              {title(categoryRoute, { category })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
