import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

const StyledMenu = styled("menu")`
  width: 200px;
  padding: 0;
  margin: 0;

  p {
    margin: 0;
  }

  a {
    text-decoration: none;
    display: block;
  }

  ol {
    padding-left: 0;
    margin-top: 0;
    list-style-type: none;
    ol {
      padding-left: 15px;
      font-size: 0.9em;
    }
  }
`;

function MenuItem({ item }) {
  return (
    <li>
      <Link hash={item.hash}>{item.title}</Link>
      {item.children ? <Group items={item.children} /> : null}
    </li>
  );
}

function Group({ items }) {
  return (
    <ol>
      {items.map(i => (
        <MenuItem key={i.hash} item={i} />
      ))}
    </ol>
  );
}

function PageMenu({ contents }) {
  return (
    <StyledMenu>
      <Group items={contents} />
    </StyledMenu>
  );
}

export default React.memo(PageMenu);
