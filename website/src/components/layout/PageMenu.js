import React from "react";
import { Link } from "@curi/react-dom";
import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  ol {
    padding-left: 15px;
    margin-top: 0;

    ol {
      ol {
        list-style-type: lower-roman;
      }
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

export default function PageMenu({ contents }) {
  return (
    <StyledDiv>
      <p>Contents:</p>
      <Group items={contents} />
    </StyledDiv>
  );
}
