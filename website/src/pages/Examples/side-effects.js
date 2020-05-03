import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../components/example/common";

let meta = {
  title: "Side Effects"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
let demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

let contents = [explanationMeta, demoMeta, onGitHubMeta];

function SideEffectExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          Side effects are observer functions that are run when a new response
          is created. They are called after other response handlers (observers
          that were set using <IJS>router.observe</IJS> and one time functions
          that were set using <IJS>router.once</IJS>). They receive the new
          response and an object with information about the navigation.
        </Paragraph>

        <Paragraph>
          Side effect functions are registered when creating a router using the{" "}
          <IJS>sideEffects</IJS> property of the options object.
        </Paragraph>

        <CodeBlock lang="javascript">
          {`import { createRouter } from "@curi/router";
import mySideEffect from './mySideEffect';

let router = createRouter(browser, routes, {
  sideEffects: [mySideEffect]
});`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/misc/side-effect"
          title="Curi side effect demo"
        />
      </HashSection>

      <OnGithub path="misc/side-effect" />
    </Page>
  );
}

export { SideEffectExample as component, contents };
