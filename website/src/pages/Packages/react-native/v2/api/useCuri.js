import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../../components/package/common";

export const meta = {
  title: "useCuri()",
  hash: "useCuri"
};

export function UseCuriAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useCuri</IJS> hook reads the current <IJS>response</IJS>,{" "}
        <IJS>navigation</IJS>, and <IJS>router</IJS> values from React's
        context.
      </p>

      <CodeBlock lang="jsx">
        {`import { useCuri } from '@curi/react-dom';

function App() {
  const {
    response,
    navigation,
    router
  } = useCuri();
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
