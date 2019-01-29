import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../components/package/common";

export const CuriousAPIMeta = {
  title: <Cmp>Curious</Cmp>,
  hash: "Curious"
};

export function CuriousAPI() {
  return (
    <HashSection title={CuriousAPIMeta.title} id={CuriousAPIMeta.hash}>
      <p>
        A context consumer component for injecting router values into
        components.
      </p>

      <CodeBlock lang="jsx">
        {`import { Curious } from '@curi/react-native';

const  MyComponent = () => (
  <Curious>
    {({ router, response, navigation }) => {
      // pass these props to any components that need them
      return (
        <ThingThatNeedsResponse response={response} />
      );
    }}
  </Curious>
);`}
      </CodeBlock>

      <HashSection tag="h3" title="Props" id="curious-props">
        <HashSection tag="h4" title="children" id="curious-children">
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
