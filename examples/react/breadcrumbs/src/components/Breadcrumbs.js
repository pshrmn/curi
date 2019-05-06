import React from "react";
import { useRouter, Link } from "@curi/react-dom";
import { ancestors } from "@curi/router";
import title from "../titleInteraction";

const Breadcrumbs = ({ name, params }) => {
  const router = useRouter();
  // assuming the route exists
  const route = router.route(name);
  const ancestorNames = ancestors(route);
  return (
    <ul className="breadcrumbs">
      {ancestorNames.map(a => {
        const ancestorRoute = router.route(a);
        return (
          <li key={a}>
            <Link name={a} params={params}>
              {title(ancestorRoute, params)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
