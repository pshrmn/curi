import React from "react";
import { InlineJS as IJS } from "../highlight/Inline";
import { HashSection, Paragraph } from "../layout/Sections";
import { CodeBlock } from "../layout/Groups";

let NPM = ({ name }) => {
  return <CodeBlock lang="bash">{`npm install @curi/${name}`}</CodeBlock>;
};

let Unpkg = ({ name, version, globalName }) => {
  return (
    <Paragraph>
      UMD scripts script are also available through{" "}
      <a href={`https://unpkg.com/@curi/${name}@${version}/dist/`}>Unpkg</a>.
      You can access the package's exports using <IJS>window.{globalName}</IJS>.
    </Paragraph>
  );
};

let Installation = ({ name, version, globalName, script }) => {
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
};

export default Installation;
