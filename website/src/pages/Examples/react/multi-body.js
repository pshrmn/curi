import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Multiple Body Components"
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

function MultiBodyExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          The <IJS>body</IJS> property of a response doesn't have to be a single
          component/function; the <IJS>body</IJS> can be anything you want it to
          be.
        </p>

        <p>
          For example, you might want to provide the main and menu content for a
          route.
        </p>

        <CodeBlock lang="javascript">
          {`response() {
  return {
    body: {
      main: MainComponent,
      menu: MenuComponent
    }
  };
}`}
        </CodeBlock>

        <p>
          Another use case is when you have multiple routes that may share the
          same root component, but may have different nested components. If the
          root has state that you want preserved when navigating, rendering a
          common root component means that React will re-use the existing
          component.
        </p>

        <CodeBlock lang="javascript">
          {`response() {
  return {
    body: {
      // multiple routes may use this root
      root: StatefulComponent,
      content: MainComponent
    }
  };
}`}
        </CodeBlock>

        <Note>
          <p>
            One thing to remember when attaching multiple components to a route
            is that all of your routes should have the same structure.
            Otherwise, when you render you will have to adapt your code to deal
            with different <IJS>response.body</IJS> layouts.
          </p>
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
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo
          id="github/pshrmn/curi/tree/master/examples/react/multi-body"
          title="Curi React multiple body components demo"
        />
      </HashSection>

      <OnGithub path="react/multi-body" />
    </React.Fragment>
  );
}

export { MultiBodyExample as component, contents };
