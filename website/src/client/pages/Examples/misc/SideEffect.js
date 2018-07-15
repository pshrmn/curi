import React from "react";
import BaseExample from "../base/BaseExample";
import { InlineJS as IJS, PrismBlock } from "../../../components/PrismBlocks";
import { Section } from "../../../components/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>
        Once a response has completed (the route's <IJS>on.initial()</IJS>{" "}
        and/or <IJS>on.every()</IJS> functions have resolved), the response's
        properties are used to create a JavaScript object. Then, any response
        handler functions are called and passed that JavaScript object . Side
        effects are permanent observers (they cannot be removed). Side effects
        can either be run before (default) or after observers that were set
        using <IJS>router.respond()</IJS>. They receive the new response and an
        object with information about the navigation.
      </p>

      <p>
        A side effect function can do anything you want. Side effects are
        observers, but unlike observers assigned using{" "}
        <IJS>router.respond()</IJS>, side effects cannot be removed.
      </p>

      <p>
        You pass any side effect functions that you want to use to the{" "}
        <IJS>curi</IJS> call, using the <IJS>sideEffects</IJS> property of the
        options object.
      </p>

      <PrismBlock lang="javascript">
        {`import { curi } from '@curi/router';
import mySideEffect from './mySideEffect';

const router = curi(history, routes, {
  sideEffects: [mySideEffect]
});`}
      </PrismBlock>
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
  </BaseExample>
);
