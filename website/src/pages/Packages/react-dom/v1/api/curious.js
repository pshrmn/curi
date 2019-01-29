import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../../components/package/common";

export const meta = {
  title: "<Curious>",
  hash: "Curious",
  children: [
    {
      title: "Props",
      hash: "Curious-props"
    }
  ]
};

export function CuriousAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        A context consumer component for injecting router values into
        components.
      </p>

      <CodeBlock lang="jsx">
        {`import { Curious } from '@curi/react-dom';

function MyComponent() {
  return (
    <Curious>
      {({ router, response, navigation }) => {
        // pass these props to any components
        // that needs them
        return (
          <ThingThatNeedsResponse
            response={response}
          />
        );
      }}
    </Curious>
  );
}`}
      </CodeBlock>

      <HashSection tag="h3" title="Props" id="Curious-props">
        <HashSection tag="h4" title="children" id="Curious-children">
          <p>
            A render-invoked function that returns a React element. This
            function will receive an object with <IJS>router</IJS>,{" "}
            <IJS>response</IJS> and <IJS>navigation</IJS> properties.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
