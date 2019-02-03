import React from "react";
import { useCuri, Link } from "@curi/react-dom";

const Breadcrumbs = ({ name, params }) => {
  const { router } = useCuri();
  return (
    <ul className="breadcrumbs">
      {router.route
        .ancestors(name)
        .reverse()
        .map(a => (
          <li key={a}>
            <Link name={a} params={params}>
              {router.route.title(a, params)}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default Breadcrumbs;
