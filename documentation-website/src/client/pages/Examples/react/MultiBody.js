import React from "react";
import BaseExample from "../base/BaseExample";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";
import { InlineJS as IJS, PrismBlock } from "../../../components/PrismBlocks";
import { Note } from "../../../components/Messages";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        The <IJS>body</IJS> property of a response doesn't have to be a single
        component/function. Sometimes you might want to attach multiple values
        to a route. This allows you to do things like specifying menu content
        for a route that is rendered in a different section than the main
        content. Another use case is when you have multiple routes that may
        share the same root component, but may have different nested components.
      </p>
      <PrismBlock lang="javascript">
        {`const routes = [
  {
    ...,
    response({ set }) {
      set.body({
        main: MainComponent,
        menu: MenuComponent
      });
    }
  }
];`}
      </PrismBlock>
      <Note>
        One thing to remember when attaching multiple components to a route is
        that all of your routes should have the same root structure. Otherwise,
        when you render you will have to adapt your code to deal with different{" "}
        <IJS>response.body</IJS> layouts.
      </Note>
      <PrismBlock lang="javascript">
        {`// don't do this!
const routes = [
  {
    ...,
    response({ set }) {
      set.body(OneLayout);
    }
  },
  {
    ...,
    response({ set }) {
      set.body({ another: Layout });
    }
  }
];`}
      </PrismBlock>
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
  </BaseExample>
);
