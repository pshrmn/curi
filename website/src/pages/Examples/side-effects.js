import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

const meta = {
  title: "Side Effects"
};

const explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
const demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

const contents = [explanationMeta, demoMeta, onGitHubMeta];

function SideEffectExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Side effects are observer functions that are run when a new response
          is created. They are called after other response handlers (observers
          that were set using <IJS>router.observe</IJS> and one time functions
          that were set using <IJS>router.once</IJS>). They receive the new
          response and an object with information about the navigation.
        </p>

        <p>
          Side effect functions are registered when creating a router using the{" "}
          <IJS>sideEffects</IJS> property of the options object.
        </p>

        <CodeBlock lang="javascript">
          {`import { createRouter } from "@curi/router";
import mySideEffect from './mySideEffect';

const router = createRouter(browser, routes, {
  sideEffects: [mySideEffect]
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/misc/side-effect"
          title="Curi side effect demo"
        />
      </HashSection>

      <OnGithub path="misc/side-effect" />
    </React.Fragment>
  );
}

export { SideEffectExample as component, contents };
