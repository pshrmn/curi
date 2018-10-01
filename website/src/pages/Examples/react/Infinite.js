import React from "react";

import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS } from "../../../components/highlight/Inline";

export default function DataLoadingExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          This example takes advantage of the{" "}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">
            <IJS>IntersectionObserver</IJS>
          </a>{" "}
          (polyfill required for IE11) to determine when we enter/exit sections
          of the page. We track the loaded sections to know which one is
          current, and navigate when the current section is no longer visible.
        </p>
        <p>
          The type of navigation depends on the next section (and its position
          in the page). When visiting a new section, a new location is pushed.
          When scrolling up to a previously loaded section, we pop backwards.
          When scrolling down to a previously loaded section, we pop forwards.
        </p>
        <p>
          This example is not exhaustive, but demonstrates the approach that
          should be used for infinite scrolling routes.
        </p>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/infinite" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/infinite">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
