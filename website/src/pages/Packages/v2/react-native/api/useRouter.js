import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export let meta = {
  title: "useRouter",
  hash: "useRouter"
};

export function UseRouterAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useRouter</IJS> hook returns the <IJS>router</IJS> object.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useRouter } from '@curi/react-native';

function App() {
  let router = useRouter();
  // ...
}`}
      </CodeBlock>
    </HashSection>
  );
}
