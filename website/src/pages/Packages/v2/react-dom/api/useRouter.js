import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export let meta = {
  title: "useRouter",
  hash: "useRouter"
};

export function UseRouterAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The <IJS>useRouter</IJS> hook returns the <IJS>router</IJS> object.
      </p>

      <CodeBlock lang="jsx">
        {`import { useRouter } from '@curi/react-dom';

function App() {
  let router = useRouter();
  // ...
}`}
      </CodeBlock>
    </HashSection>
  );
}
