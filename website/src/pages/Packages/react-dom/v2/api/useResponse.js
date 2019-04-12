import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "useResponse()",
  hash: "useResponse"
};

export function UseResponseAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useResponse</IJS> hook reads the current <IJS>response</IJS>,{" "}
        <IJS>navigation</IJS>, and <IJS>router</IJS> values from React's
        context. This will be called every time a new response is emitted.
      </p>

      <CodeBlock lang="jsx">
        {`import { useResponse } from '@curi/react-dom';

function App() {
  const {
    response,
    navigation,
    router
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
