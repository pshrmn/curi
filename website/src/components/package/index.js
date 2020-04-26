import React from "react";

import Version from "./Version";
import Installation from "./Installation";
import GitHubLink from "./GitHubLink";
import NPMLink from "./NPMLink";

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
  sections
}) {
  if (name !== undefined) {
    let major = params.version !== undefined ? params.version : latest;
    let currentVersion = versions[major];
    return (
      <React.Fragment>
        <h1 tabIndex={-1} clasName="outline-none">
          @curi/{name}
        </h1>
        <section className="flex flex-col flex-no-wrap items-start">
          <Version major={major} versions={versions} params={params} />
          <GitHubLink name={name} dir={getDir(name)} />
          <NPMLink name={name} />
        </section>
        {sections.about}
        <Installation
          name={name}
          version={currentVersion}
          globalName={globalName}
          script={script}
        />
        {sections.api}
      </React.Fragment>
    );
  } else {
    return children;
  }
}
