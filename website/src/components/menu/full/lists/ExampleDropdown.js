import React from "react";

import EXAMPLE_API from "../../../../constants/examples";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import DropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

let examples = EXAMPLE_API.all();
let exampleParams = Object.keys(examples).reduce((acc, e) => {
  acc.push({
    name: "Example",
    params: { slug: e.slug }
  });
  return acc;
}, []);

let ExampleLinks = ({ hidden }) => {
  usePrefetch(exampleParams, !hidden);

  return (
    <Container hidden={hidden}>
      <DropdownMenu>
        <ul style={{ margin: "0 25px" }}>
          {examples.map(e => {
            return (
              <li key={`${e.category}/${e.slug}`}>
                <ActiveLink
                  name="Example"
                  params={{ category: e.category, slug: e.slug }}
                  activeClassName="font-bold"
                >
                  {e.name}
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </DropdownMenu>
    </Container>
  );
};

export default React.memo(ExampleLinks);
