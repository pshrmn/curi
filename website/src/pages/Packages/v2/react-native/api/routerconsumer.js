import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

let propsMeta = {
  title: "Props",
  hash: "RouterConsumer-props"
};
export let meta = {
  title: "RouterConsumer",
  hash: "RouterConsumer"
};

export function RouterConsumerAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        A context consumer component for injecting the router into components.
        Its primary use case is in class components.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { RouterConsumer } from '@curi/react-native';

class MyComponent {
  render() {
    return (
      <RouterConsumer>
        {router => {
          return (
            <button onClick={e => {
              login();
              let url = router.url({ name: "Home" });
              router.navigate({ url });
            }}>
              Submit
            </button>
          );
        }}
      </RouterConsumer>
    );
  }
}`}
      </CodeBlock>

      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "RouterConsumer-children" }}
        >
          <Paragraph>
            A render-invoked function that returns a React element. This
            function will receive the application's <IJS>router</IJS>.
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
