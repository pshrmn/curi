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

const StyledMenu = styled("div")`
  background: ${color.lightGray};
  padding: 25px;

  @media only screen and (min-width: ${screen.medium}) {
    width: 250px;
    order: -1;
    flex-shrink: 0;
    margin-right: 25px;
  }
`;

export default function PackagePage({ response }) {
  const { component: Component, contents } = response.data.content;
  return (
    <StyledPage>
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
      <StyledMenu>
        <PageMenu contents={contents} />
      </StyledMenu>
    </StyledPage>
  );
}
