import React from "react";
import styled from "@emotion/styled";

import Version from "./Version";
import Installation from "./Installation";
import GitHubLink from "./GitHubLink";
import NPMLink from "./NPMLink";
import PageMenu from "../layout/PageMenu";

const StyledPackageInfo = styled("div")`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;

  > * {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

function getDir(name) {
  if (name.indexOf("route-") === 0) {
    return "interactions";
  } else if (name.indexOf("side-effect-") === 0) {
    return "side-effects";
  } else {
    return;
  }
}

export default function BasePackage({
  name,
  params,
  versions,
  latest,
  globalName,
  children,
  script = true,
  contents
}) {
  if (name !== undefined) {
    const major = params.version !== undefined ? params.version : latest;
    const currentVersion = versions[major];
    return (
      <React.Fragment>
        <h1>@curi/{name}</h1>
        <StyledPackageInfo>
          <Version major={major} versions={versions} params={params} />
          <GitHubLink name={name} dir={getDir(name)} />
          <NPMLink name={name} />
        </StyledPackageInfo>
        <PageMenu contents={contents} />
        <Installation
          name={name}
          version={currentVersion}
          globalName={globalName}
          script={script}
        />
        {children || null}
      </React.Fragment>
    );
  } else {
    return children;
  }
}
