import React from "react";
import { useRouter, Link } from "@curi/react-dom";
import { ancestors } from "@curi/interactions";
import title from "../titleInteraction";

const Breadcrumbs = ({ name, params }) => {
  const router = useRouter();
  // assuming the route exists
  const route = router.route(name);
  const ancestorNames = ancestors(route);
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
