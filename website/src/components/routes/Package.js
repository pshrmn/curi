import React from "react";
import styled from "@emotion/styled";

import Page from "../layout/TwoColumnPage";
import PageMenu from "../layout/PageMenu";
import BasePackage from "../package";
import { screen, color } from "../../constants/styles";

const StyledPage = styled(Page)`
  @media only screen and (min-width: ${screen.medium}) {
    max-width: 100vw;
  }
`;

const StyledBase = styled("div")`
  @media only screen and (min-width: ${screen.medium}) {
    margin-left: 250px;
  }
`;

const StyledMenu = styled("div")`
  display: none;

  @media only screen and (min-width: ${screen.medium}) {
    background: ${color.lightGray};
    display: block;
    position: fixed;
    top: 50px;
    bottom: 0px;
    overflow: auto;

    flex: 0 0;
    order: -1;
    padding: 25px;
    margin-right: 25px;
  }
`;

export default function PackagePage({ response }) {
  const { component: Component, contents } = response.data.content;
  return (
    <StyledPage>
      <StyledBase>
        <BasePackage
          name={response.data.name}
          params={response.params}
          versions={response.data.versions}
          latest={response.data.latest}
          globalName={response.data.globalName}
          script={response.data.script}
          contents={contents}
        >
          <Component />
        </BasePackage>
      </StyledBase>
      <StyledMenu>
        <PageMenu contents={contents} />
      </StyledMenu>
    </StyledPage>
  );
}
