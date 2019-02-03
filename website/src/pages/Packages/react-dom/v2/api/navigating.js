import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp
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
        The <Cmp>Navigating</Cmp> component is a wrapper around the{" "}
        <Link hash="useNavigating">
          <IJS>useNavigating</IJS>
        </Link>{" "}
        hook.
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
      <HashSection tag="h3" meta={propsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "children()", hash: "Navigating-children" }}
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
