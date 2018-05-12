import React from "react";
import BaseExample from "../base/BaseExample";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        When a user navigates to one of your routes, the re-rendering will not
        be triggered until a response has been created. If the route that
        matches has a <IJS>on.every()</IJS> function that makes a request to the
        server, the re-render will be delayed, possibly giving the user the
        impression that nothing is happening.
      </p>

      <p>
        The <Cmp>Prefetch</Cmp> component lets you load data prior to navigating
        to a route. This uses the <IJS>prefetch</IJS> route interaction and the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver">
          <IJS>IntersectionObserver</IJS>
        </a>{" "}
        API to load data for a route when a specified element is visible in the
        page. This example uses <Cmp>Link</Cmp>s so that when the associated{" "}
        <Cmp>a</Cmp> element is visible, the data will be fetched.
      </p>

      <PrismBlock lang="javascript">
        {`import prefetch from "@curi/route-prefetch";

const router = curi(history, routes, {
  route: [prefetch()]
});

<Prefetch match={{ name: "Album", params: { id: 1 } }}>
  {ref => (
    <Link to="Album" params={{ id: 1 }} ref={ref}>
      Album 1
    </Link>
  )}
</Prefetch>
// when <a href="/a/1">Album 1</a> is visible,
// the data for that route will be loaded`}
      </PrismBlock>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/data-loading" />
    </Section>

    <Section title="On GitHub" id="source">
      If you want to run this code locally, the source code is available on
      GitHub{" "}
      <a href="https://github.com/pshrmn/curi/tree/master/examples/react/data-loading">
        here
      </a>.
    </Section>
  </BaseExample>
);
