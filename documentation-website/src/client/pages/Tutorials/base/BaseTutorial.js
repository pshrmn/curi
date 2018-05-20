import React from "react";
import { css } from "emotion";

import TutorialLinks from "./TutorialLinks";
import Page from "../../../components/Page";
import PageLinks from "../../../components/PageLinks";
import Content from "../../../components/Content";
import STYLES from "../../../constants/styles";

const tutorial = css(`
.link-list {
  li {
    &.solo {
      border-bottom: 1px solid ${STYLES.lightGray};
    }

    ul {
      display: flex;
      margin: 0;
      li {
        margin: 0 5px;
      }
    }
  }
}

.tutorial-branch {
  background: ${STYLES.lightOrange};
  border: 1px solid ${STYLES.brightOrange};
  padding: 10px;

  p {
    margin: 0;
  }

  ul {
    margin: 0;
  }

  :not(pre) > code[class*="language-"] {
    background: ${STYLES.orange};
  }
}

.tutorial-outline {
  border: 1px solid ${STYLES.borderBlue};
  padding: 10px;
  margin: 5px 0;
  background: ${STYLES.lightBlue};

  p {
    margin: 0;
  }

  ul {
    margin: 0;
  }

  :not(pre) > code[class*="language-"] {
    background: ${STYLES.blue};
  }
}
`);

export default ({ children }) => (
  <Page type={tutorial}>
    <Content>{children || null}</Content>
    <PageLinks>
      <h2>Tutorials</h2>
      <TutorialLinks />
    </PageLinks>
  </Page>
);
