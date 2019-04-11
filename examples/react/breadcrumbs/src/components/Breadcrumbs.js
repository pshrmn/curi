import React from "react";
import { useRouter, Link } from "@curi/react-dom";

const Breadcrumbs = ({ name, params }) => {
  const router = useRouter();
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
