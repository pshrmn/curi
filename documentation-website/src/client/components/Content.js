import React from "react";
import { css } from "emotion";

import STYLES from "../constants/styles";

const content = css(`
ul {
  padding: 0;
  list-style: none;
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  order: 2;
  flex-grow: 1;
  position: relative;
  padding: 0 50px;
}
`);

export default ({ children }) => <div className={content}>{children}</div>;
