import React from "react";
import { css } from "emotion";

import STYLES from "../constants/styles";

const note = css(`
padding: 10px 5px;
margin: 5px 0;

background: ${STYLES.gray};
border: 1px solid ${STYLES.borderGray};

&:not(pre) > code[class*="language-"] {
  background: ${STYLES.white};
}

.aside & {
  background: ${STYLES.white};
}
`);

const warning = css(`
padding: 10px 5px;
margin: 5px 0;
background: ${STYLES.lightOrange};
border: 1px solid ${STYLES.brightOrange};
&:not(pre) > code[class*="language-"] {
  background: ${STYLES.orange};
}
`);

export const Note = ({ children }) => (
  <div className={note}>
    <strong>Note:</strong> {children}
  </div>
);

export const Warning = ({ children }) => (
  <div className={warning}>
    <strong>Warning:</strong> {children}
  </div>
);
