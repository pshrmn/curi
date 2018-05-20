import React from "react";
import { Link } from "@curi/react";
import { css } from "emotion";

import STYLES from "../constants/styles";

const section = css(`
&.section,
&.subsection {
  margin-top: 15px;

  .header-link {
    margin-left: 10px;
    text-decoration: none;
    color: ${STYLES.darkGray};
  }
}

&.aside {
  padding: 5px 10px;
  border-left: 2px solid ${STYLES.borderGreen};
  background: ${STYLES.lightGreen};
  margin-top: 15px;

  .header-link {
    margin-left: 10px;
    text-decoration: none;
    color: ${STYLES.darkGray};
  }

  :not(pre) > code[class*="language-"] {
    background: ${STYLES.green};
  }
}
`);

const Sectional = ({ title, id, children, tag: Tag, type = "section" }) => (
  <div className={`${section} ${type}`} id={id}>
    <Tag>
      {title}
      <Link className="header-link" hash={id}>
        #
      </Link>
    </Tag>
    {children}
  </div>
);

export const Section = ({ tag = "h2", ...rest }) => (
  <Sectional type="section" tag={tag} {...rest} />
);

export const Subsection = ({ tag = "h3", ...rest }) => (
  <Sectional type="subsection" tag={tag} {...rest} />
);
