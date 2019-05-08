import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Curious-props"
};
export const meta = {
  title: "<Curious>",
  hash: "Curious",
  children: [propsMeta]
};

export function CuriousAPI() {
  return (
    <HashSection meta={meta}>
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

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "Curious-children" }}
        >
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
