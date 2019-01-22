import React from "react";
import styled from "@emotion/styled";

import TutorialLinks from "../links/TutorialLinks";
import PageLinks from "../layout/PageLinks";
import Page from "../layout/Page";
import Content from "../layout/Content";
import { color } from "../../constants/styles";

const StyledPage = styled(Page)`
  .link-list {
    li {
      &.solo {
        border-bottom: 1px solid ${color.lightGray};
      }

      ul {
        display: flex;
        flex-flow: column nowrap;
        margin: 0;
        li {
          margin: 0 5px;
        }
      }
    }
  }

  .tutorial-branch {
    background: ${color.lightOrange};
    border: 1px solid ${color.brightOrange};
    padding: 10px;

    p {
      margin: 0;
    }

    ul {
      margin: 0;
    }

    .inline-code {
      background: ${color.orange} !important;
    }
  }

  .tutorial-outline {
    border: 1px solid ${color.borderBlue};
    padding: 10px;
    margin: 5px 0;
    background: ${color.lightBlue};

    p {
      margin: 0;
    }

    .inline-code {
      background: ${color.blue} !important;
    }
  }
`;

export default function TutorialTemplate({ children }) {
  return (
    <StyledPage>
      <Content>{children}</Content>
      <PageLinks>
        <React.Fragment>
          <h2>Tutorials</h2>
          <TutorialLinks />
        </React.Fragment>
      </PageLinks>
    </StyledPage>
  );
}
