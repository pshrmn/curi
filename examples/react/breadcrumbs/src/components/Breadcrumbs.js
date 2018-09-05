import React from "react";
import { Curious, Link } from "@curi/react-dom";

const Breadcrumbs = ({ name, params }) => (
  <Curious>
    {({ router }) => (
      <ul className="breadcrumbs">
        {router.route
          .ancestors(name)
          .reverse()
          .map(a => (
            <li key={a}>
              <Link to={a} params={params}>
                {router.route.title(a, params)}
              </Link>
            </li>
          ))}
      </ul>
    )}
  </Curious>
);

export default Breadcrumbs;
