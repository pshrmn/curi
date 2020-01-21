import React from "react";
import { useRouter, Link } from "@curi/react-dom";
import { ancestors } from "@curi/interactions";
import title from "../titleInteraction";

let Breadcrumbs = ({ name, params }) => {
  let router = useRouter();
  // assuming the route exists
  let route = router.route(name);
  let ancestorNames = ancestors(route);
  return (
    <ul className="breadcrumbs">
      {ancestorNames.map(a => {
        return (
          <li key={a.name}>
            <Link name={a.name} params={params}>
              {title(a, params)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
