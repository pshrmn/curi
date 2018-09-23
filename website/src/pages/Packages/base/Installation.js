import React from "react";
import { InlineJS as IJS } from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import { isNull } from "util";
import {
  SideBySide,
  Explanation,
  CodeBlock
} from "../../../components/SideBySide";

const NPM = ({ name }) => (
  <SideBySide>
    <Explanation>
      <p>
        The package can be installed through <IJS>npm</IJS> (you need to have
        Node & NPM installed).
      </p>
    </Explanation>
    <CodeBlock lang="bash">{`npm install @curi/${name}`}</CodeBlock>
  </SideBySide>
);

const Unpkg = ({ name, version, globalName }) => (
  <SideBySide>
    <Explanation>
      <p>
        Prefer inline scripts? A full and minified script is available for every
        version through{" "}
        <a href={`https://unpkg.com/@curi/${name}@${version}/`}>Unpkg</a>. You
        can access the package's exports through <IJS>window.{globalName}</IJS>.
      </p>
    </Explanation>
    <CodeBlock lang="markup">
      {`<script src="https://unpkg.com/@curi/${name}@${version}/dist/curi-${name}.umd.js"></script>
<script type="text/javascript">
  window.${globalName}
</script>`}
    </CodeBlock>
  </SideBySide>
);

export default function Installation({ name, version, globalName, unpkg }) {
  return (
    <Section title="Installation" id="installation">
      <NPM name={name} />
      {unpkg ? (
        <Unpkg name={name} version={version} globalName={globalName} />
      ) : null}
    </Section>
  );
}
