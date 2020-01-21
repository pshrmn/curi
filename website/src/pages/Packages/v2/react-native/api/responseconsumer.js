import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "ResponseConsumer-props"
};
export let meta = {
  title: "ResponseConsumer",
  hash: "ResponseConsumer"
};

export function ResponseConsumerAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        A context consumer component for injecting response values into
        components. Its primary use case is in class components.
      </p>

      <CodeBlock lang="jsx">
        {`import { ResponseConsumer } from '@curi/react-native';

class MyComponent {
  render() {
    return (
      <ResponseConsumer>
        {({ response, navigation }) => {
          // pass these props to any components
          // that needs them
          return (
            <ThingThatNeedsResponse
              response={response}
            />
          );
        }}
      </ResponseConsumer>
    );
  }
}`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "ResponseConsumer-children" }}
        >
          <p>
            A render-invoked function that returns a React element. This
            function will receive an object with <IJS>response</IJS> and{" "}
            <IJS>navigation</IJS> properties.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
