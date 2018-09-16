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
        If you have Node and NPM installed, you can install the package through{" "}
        <IJS>npm</IJS> (or <IJS>yarn</IJS> if you prefer).
      </p>
    </Explanation>
    <CodeBlock lang="bash">
      {`npm install @curi/${name}
yarn add @curi/${name}`}
    </CodeBlock>
  </SideBySide>
);

const Unpkg = ({ name, version, globalName }) => (
  <SideBySide>
    <Explanation>
      <p>
        Prefer inline scripts? Every version is available through{" "}
        <a href={`https://unpkg.com/@curi/${name}@${version}/`}>Unpkg</a>. There
        are both full and minified versions available. You can access the
        package's exports through <IJS>window.{globalName}</IJS>.
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
