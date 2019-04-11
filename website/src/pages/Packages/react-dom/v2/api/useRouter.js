import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export const meta = {
  title: "useRouter()",
  hash: "useRouter"
};

export function UseRouterAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>useRouter</IJS> hook returns the <IJS>router</IJS> object.
      </p>

      <CodeBlock lang="jsx">
        {`import { useRouter } from '@curi/react-dom';

function App() {
  const router = useRouter();
  // ...
}`}
      </CodeBlock>

      <Note>
        <p>
          The <IJS>router</IJS> can also be accessed using the{" "}
          <IJS>useResponse</IJS> hook. The difference is that{" "}
          <IJS>useResponse</IJS> is called every time there is a new response.
          If a component only cares about the <IJS>router</IJS>, the component
          should use <IJS>useRouter</IJS>, which will not cause extra renders.
        </p>
      </Note>
    </HashSection>
  );
}
