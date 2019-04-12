import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

const propsMeta = {
  title: "Props",
  hash: "Navigating-props"
};
export const meta = {
  title: "<Navigating>",
  hash: "Navigating",
  children: [propsMeta]
};

export function NavigatingAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>Navigating</IJS> component lets you know when the application
        is navigating and let users cancel the navigation. Its{" "}
        <IJS>children</IJS> prop is a render-invoked function that is passed a
        function to cancel the navigation.
      </p>
      <p>
        When navigation starts, <IJS>children</IJS> will be called with a
        function that will cancel navigation when it is called.
      </p>
      <p>
        When navigation finishes, <IJS>children</IJS> will be called with no
        arguments.
      </p>

      <CodeBlock lang="jsx">
        {`import { Navigating } from "@curi/react-dom";

<Navigating>
  {cancel => {
    if (cancel === undefined) {
      return null;
    }
    return (
      <button onClick={cancel}>
        Cancel Navigation
      </button>
    );
  }}
</Navigating>`}
      </CodeBlock>
      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "Navigating-children" }}
        >
          <p>
            A function that returns a React node. The function will be called
            with a <IJS>cancel</IJS> function when navigation starts and with no
            arguments when the navigation is finished.
          </p>
          <p>
            Calling the <IJS>cancel</IJS> function after the navigation is
            finished has no effect.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
