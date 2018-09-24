import React from "react";

import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function SideEffectExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          Once a response has completed (the route's <IJS>resolve</IJS>{" "}
          functions have resolved), the response's properties are used to create
          a JavaScript object. Then, any response handler functions are called
          and passed that JavaScript object . Side effects are permanent
          observers (they cannot be removed). Side effects after other response
          handlers (observers that were set using <IJS>router.observe()</IJS>{" "}
          and one time functions that were set using <IJS>router.once()</IJS>).
          They receive the new response and an object with information about the
          navigation.
        </p>

        <p>
          A side effect function can do anything you want. Unlike observers
          assigned using <IJS>router.observe()</IJS>, side effects cannot be
          removed.
        </p>

        <p>
          You pass any side effect functions that you want to use to the{" "}
          <IJS>curi</IJS> call, using the <IJS>sideEffects</IJS> property of the
          options object.
        </p>

        <CodeBlock lang="javascript">
          {`import { curi } from '@curi/router';
  import mySideEffect from './mySideEffect';

  const router = curi(history, routes, {
    sideEffects: [mySideEffect]
  });`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/misc/side-effect" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/misc/side-effect">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
