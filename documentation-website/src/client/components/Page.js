import React from "react";
import { css } from "emotion";

import STYLES from "../constants/styles";

const page = css(`
position: relative;

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  padding-top: 15px;
  display: flex;
  flex-flow: row-nowrap;
}
`);

export default ({ children, type }) => (
  <div className={`${page} ${type}`}>{children}</div>
);
