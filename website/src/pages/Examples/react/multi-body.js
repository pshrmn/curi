import React from "react";

import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Note } from "../../../components/Messages";

const meta = {
  title: "Multiple Body Components"
};

export default function MultiBodyExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          The <IJS>body</IJS> property of a response doesn't have to be a single
          component/function. Sometimes you might want to attach multiple values
          to a route. For example, specifying menu content for a route that is
          rendered in a different section of the application than the main
          content. Another use case is when you have multiple routes that may
          share the same root component, but may have different nested
          components.
        </p>
        <CodeBlock lang="javascript">
          {`const routes = prepareRoutes([
  {
    ...,
    response() {
      return {
        body: {
          main: MainComponent,
          menu: MenuComponent
        }
      };
    }
  }
]);`}
        </CodeBlock>
        <Note>
          One thing to remember when attaching multiple components to a route is
          that all of your routes should have the same root structure.
          Otherwise, when you render you will have to adapt your code to deal
          with different <IJS>response.body</IJS> layouts.
        </Note>
        <CodeBlock lang="javascript">
          {`// be consistent, don't use
// different body types
const routes = prepareRoutes([
  {
    ...,
    response() {
      return {
        body: OneLayout
      };
    }
  },
  {
    ...,
    response() {
      return {
        body: { another: Layout }
      };
    }
  }
]);`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/multi-body" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/multi-body">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
