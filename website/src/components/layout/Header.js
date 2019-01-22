import React from "react";
import styled from "@emotion/styled";

import Nav from "./Nav";
import { color, screen } from "../../constants/styles";

const StyledHeader = styled("header")`
  background: ${color.purple};
  width: 100%;
  padding: 15px;

  nav {
    color: ${color.lightGray};

    ul {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-end;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0 10px;
    }

    a {
      color: ${color.lightGray};
      font-size: 1.1em;
      text-decoration: none;
      display: flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid ${color.purple};

      &:hover {
        color: ${color.brightOrange};
      }

      &.active {
        color: ${color.brightOrange};
        border-bottom-color: ${color.brightOrange};
      }
    }
  }

  .home-link {
    font-size: 1.5em;
    color: ${color.brightOrange};
  }

  @media only screen and (min-width: ${screen.medium}) {
    padding: 0;
    position: fixed;
    z-index: 1;

    nav {
      ul {
        max-width: 100%;
        li {
          margin-right: 20px;
          padding: 0;
        }
      }

      a {
        border-bottom-width: 3px;
        padding: 0 5px;
      }
    }
  }
`;

export default React.memo(function Header() {
  return (
    <StyledHeader>
      <Nav />
    </StyledHeader>
  );
});
