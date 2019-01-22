import React from "react";

import Version from "./Version";
import Installation from "./Installation";
import GitHubLink from "./GitHubLink";
import NPMLink from "./NPMLink";

import "../../scss/package.scss";

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
  script = true
}) {
  if (name !== undefined) {
    const major = params.version !== undefined ? params.version : latest;
    const currentVersion = versions[major];
    return (
      <React.Fragment>
        <h1>@curi/{name}</h1>
        <div className="package-info">
          <Version major={major} versions={versions} params={params} />
          <GitHubLink name={name} dir={getDir(name)} />
          <NPMLink name={name} />
        </div>
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
