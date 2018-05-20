import React from "react";
import { css } from "emotion";

import Nav from "./Nav";
import STYLES from "../constants/styles";

const header = css(`
background: ${STYLES.purple};
width: 100%;
padding: 30px 15px;

nav {
  color: ${STYLES.lightGray};

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
    color: ${STYLES.lightGray};
    font-size: 1.1em;
    text-decoration: none;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid ${STYLES.purple};

    &:hover {
      color: ${STYLES.brightOrange};
    }

    &.active {
      color: ${STYLES.brightOrange};
      border-bottom-color: ${STYLES.brightOrange};
    }
  }
}

.home-link {
  font-size: 1.5em;
  color: ${STYLES.brightOrange};
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
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
`);

export default () => (
  <header className={header}>
    <Nav />
  </header>
);
