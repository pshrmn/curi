import React from "react";

import Installation from "./Installation";
import About from "./About";
import GitHubLink from "./GitHubLink";
import NPMLink from "./NPMLink";
import PackageLinks from "./PackageLinks";
import Page from "../../../components/Page";
import PageLinks from "../../../components/PageLinks";
import Content from "../../../components/Content";

// import "../../../scss/package.scss";

function getDir(name) {
  if (name.indexOf("route-") === 0) {
    return "interactions";
  } else if (name.indexOf("side-effect-") === 0) {
    return "side-effects";
  } else {
    return;
  }
}

const BasePackage = ({
  name,
  version,
  globalName,
  children,
  about,
  unpkg = true
}) => (
  <Page type="package">
    <Content>
      <h1>@curi/{name}</h1>
      <div className="package-info">
        <div>v{version}</div>
        <GitHubLink name={name} dir={getDir(name)} />
        <NPMLink name={name} />
      </div>
      <About about={about} />
      <Installation
        name={name}
        version={version}
        globalName={globalName}
        unpkg={unpkg}
      />
      {children || null}
    </Content>
    <PageLinks>
      <h2>Packages</h2>
      <PackageLinks />
    </PageLinks>
  </Page>
);

export default BasePackage;
