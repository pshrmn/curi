import React from "react";
import { css } from "emotion";

import { Section } from "../../../components/Sections";
import STYLES from "../../../constants/styles";

const api = css(`
> .section {
  border-bottom: 3px double ${STYLES.purple};
}

.section {
  margin-bottom: 5px;
}
`);

export default ({ children }) => (
  <Section title="API" id="API" className={api}>
    {children}
  </Section>
);
