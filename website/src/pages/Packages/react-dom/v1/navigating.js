import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
} from "../../../../components/package/common";

export const meta = {
  title: <Cmp>Navigating</Cmp>,
  hash: "Navigating",
  children: [
    {
      title: "Props",
      hash: "Navigating-props"
    }
  ]
};

export function NavigatingAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The <Cmp>Navigating</Cmp> component lets you know when the application
        is navigating and let users cancel the navigation. Its{" "}
        <IJS>children</IJS> prop is a render-invoked function that is passed a
        function to cancel the navigation.
      </p>
      <p>
        When navigation starts, <IJS>children()</IJS> will be called with a
        function that will cancel navigation when it is called.
      </p>
      <p>
        When navigation finishes, <IJS>children()</IJS> will be called with no
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
      <HashSection tag="h3" title="Props" id="Navigating-props">
        <HashSection tag="h4" title="children()" id="Navigating-children">
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
