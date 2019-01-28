import React from "react";
import { InlineJS as IJS } from "../highlight/Inline";
import { HashSection } from "../layout/Sections";
import { CodeBlock } from "../layout/Groups";

function NPM({ name }) {
  return (
    <React.Fragment>
      <p>
        The package can be installed through <IJS>npm</IJS> (you need to have
        Node & NPM installed).
      </p>
      <CodeBlock lang="bash">{`npm install @curi/${name}`}</CodeBlock>
    </React.Fragment>
  );
}

function Unpkg({ name, version, globalName }) {
  return (
    <p>
      Prefer inline scripts? A full (<IJS>.umd.js</IJS>) and minified (
      <IJS>.min.js</IJS>) script is available for every version through{" "}
      <a href={`https://unpkg.com/@curi/${name}@${version}/dist/`}>Unpkg</a>.
      You can access the package's exports through{" "}
      <IJS>window.{globalName}</IJS>.
    </p>
  );
}

export default function Installation({ name, version, globalName, script }) {
  return (
    <HashSection title="Installation" id="installation">
      <NPM name={name} />
      {script ? (
        <Unpkg name={name} version={version} globalName={globalName} />
      ) : null}
    </HashSection>
  );
}
