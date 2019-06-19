import React from "react";
import { InlineJS as IJS } from "../highlight/Inline";
import { HashSection } from "../layout/Sections";
import { CodeBlock } from "../layout/Groups";

function NPM({ name }) {
  return (
    <React.Fragment>
      <CodeBlock lang="bash">{`npm install @curi/${name}`}</CodeBlock>
    </React.Fragment>
  );
}

function Unpkg({ name, version, globalName }) {
  return (
    <p>
      UMD scripts script are also available through{" "}
      <a href={`https://unpkg.com/@curi/${name}@${version}/dist/`}>Unpkg</a>.
      You can access the package's exports using <IJS>window.{globalName}</IJS>.
    </p>
  );
}

export default function Installation({ name, version, globalName, script }) {
  return (
    <HashSection
      meta={{ title: "Installation", hash: "installation" }}
      tag="h2"
    >
      <NPM name={name} />
      {script ? (
        <Unpkg name={name} version={version} globalName={globalName} />
      ) : null}
    </HashSection>
  );
}
