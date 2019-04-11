import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "useRouter()",
  hash: "useRouter"
};

export function UseRouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useRouter</IJS> hook reads the current <IJS>response</IJS>,{" "}
        <IJS>navigation</IJS>, and <IJS>router</IJS> values from React's
        context.
      </p>

      <CodeBlock lang="jsx">
        {`import { useRouter } from '@curi/react-dom';

function App() {
  const router = useRouter();
  // ...
}`}
      </CodeBlock>
    </HashSection>
  );
}
