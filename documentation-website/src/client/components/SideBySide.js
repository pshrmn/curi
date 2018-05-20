import React from "react";
import { PrismBlock } from "./PrismBlocks";
import { css } from "emotion";

import STYLES from "../constants/styles";

const sidebySide = css(`
margin: 10px 0 20px;
width: 100%;
display: flex;
flex-flow: row wrap;
justify-content: flex-start;

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  & > :first-child {
    margin-right: 20px;
  }
}
`);

const explanation = css(`
width: 100%;

p {
  margin: 0 0 25px;
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  flex: 1 1 50%;
  max-width: 600px;
}
`);

const codeBlock = css(`
width: 100%;

pre {
  height: 100%;
  vertical-align: top;
}

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  flex: 1 0 50%;

  code {
    min-width: 200px;
  }
}
`);

export const SideBySide = ({ children }) => (
  <div className={sidebySide}>{children}</div>
);

export const Explanation = ({ children }) => (
  <div className={explanation}>{children}</div>
);

export const CodeBlock = ({ children, lang = "javascript" }) => (
  <div className={codeBlock}>
    <PrismBlock lang={lang}>{children}</PrismBlock>
  </div>
);
