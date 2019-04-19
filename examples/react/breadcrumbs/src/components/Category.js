import React from "react";
import { Link, useRouter } from "@curi/react-dom";
import Breadcrumbs from "./Breadcrumbs";

function Category({ response: { params, data: products } }) {
  const router = useRouter();
  return (
    <div>
      <Breadcrumbs name="Category" params={params} />
      <h1>{params.category}</h1>
      <p>List of products</p>
      <ul>
        {products.map(p => {
          const productParams = { ...params, productID: p.id };
          return (
            <li key={p.id}>
              <Link name="Product" params={productParams}>
                {router.route.title("Product", { name: p.name })}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
