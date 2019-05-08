import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "useResponse",
  hash: "useResponse"
};

export function UseResponseAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useResponse</IJS> hook reads the current <IJS>response</IJS>{" "}
        and <IJS>navigation</IJS> values from React's context. This will be
        called every time a new response is emitted.
      </p>

      <CodeBlock lang="jsx">
        {`import { useResponse } from '@curi/react-native';

function App() {
  const {
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
