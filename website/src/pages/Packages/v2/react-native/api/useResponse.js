import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export let meta = {
  title: "useResponse",
  hash: "useResponse"
};

export function UseResponseAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>useResponse</IJS> hook reads the current <IJS>response</IJS>{" "}
        and <IJS>navigation</IJS> values from React's context. This will be
        called every time a new response is emitted.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { useResponse } from '@curi/react-native';

function App() {
  let {
    response,
    navigation
  } = useResponse();
  return (
    <ThingThatNeedsResponse
      response={response}
    />
  );
}`}
      </CodeBlock>
    </HashSection>
  );
}
