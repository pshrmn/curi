import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "RouterConsumer-props"
};
export const meta = {
  title: "<RouterConsumer>",
  hash: "RouterConsumer",
  children: [propsMeta]
};

export function RouterConsumerAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A context consumer component for injecting the router into components.
        Its primary use case is in class components.
      </p>

      <CodeBlock lang="jsx">
        {`import { RouterConsumer } from '@curi/react-dom';

class MyComponent {
  render() {
    return (
      <RouterConsumer>
        {router => {
          return (
            <button onClick={e => {
              login();
              const url = router.url({ name: "Home" });
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
          <p>
            A render-invoked function that returns a React element. This
            function will receive the application's <IJS>router</IJS>.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
