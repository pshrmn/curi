import React from "react";

import EXAMPLE_API from "../../../../constants/examples";
import ActiveLink from "../../../links/ActiveLink";
import Container from "./Container";
import StyledDropdownMenu from "./DropdownMenu";
import usePrefetch from "./usePrefetch";

const examples = EXAMPLE_API.all();
const exampleParams = Object.keys(examples).reduce((acc, e) => {
  acc.push({
    name: "Example",
    params: { slug: e.slug }
  });
  return acc;
}, []);

function ExampleLinks({ active, close }) {
  usePrefetch(exampleParams, active);

  if (!active) {
    return null;
  }

  return (
    <Container active={active} close={close}>
      <StyledDropdownMenu>
        <ul className="link-list" style={{ margin: "0 25px" }}>
          {examples.map(e => {
            return (
              <li key={`${e.category}/${e.slug}`} className="solo">
                <ActiveLink
                  name="Example"
                  params={{ category: e.category, slug: e.slug }}
                >
                  {e.name}
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </StyledDropdownMenu>
    </Container>
  );
}

export default React.memo(ExampleLinks);
