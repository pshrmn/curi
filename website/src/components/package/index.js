import React from "react";

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
  version,
  globalName,
  children,
  script = true
}) {
  return name !== undefined ? (
    <React.Fragment>
      <h1>@curi/{name}</h1>
      <div className="package-info">
        <div>v{version}</div>
        <GitHubLink name={name} dir={getDir(name)} />
        <NPMLink name={name} />
      </div>
      <Installation
        name={name}
        version={version}
        globalName={globalName}
        script={script}
      />
      {children || null}
    </React.Fragment>
  ) : (
    children
  );
}
