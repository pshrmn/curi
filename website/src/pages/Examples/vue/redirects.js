import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub,
  onGitHubMeta
} from "../../../components/example/common";

const meta = {
  title: "Authentication"
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

function AuthenticationExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection meta={explanationMeta}>
        <p>
          Sometimes you will want to redirect based on the results of your{" "}
          <IJS>resolve</IJS> function. For instance, you might see that a user
          is not authenticated and shouldn't be able to view a page.
        </p>

        <p>
          A <IJS>response</IJS> function can modify the response by setting a{" "}
          <IJS>redirectTo</IJS> property on its return object. Curi will
          automatically (unless configured not to) redirect to that location.
        </p>

        <CodeBlock lang="javascript">
          {`const routes = prepareRoutes([
  // ...,
  {
    name: 'Protected',
    path: 'super-secret',
    response: () => {
      if (!store.userIsAuthenticated) {
        return {
          name: "Login",
          status: 302
        };
      }
    }
  },
  {
    name: 'Login',
    path: 'login',
    ...
  }
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={demoMeta}>
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/redirects" />
      </HashSection>

      <OnGithub path="vue/redirects" />
    </React.Fragment>
  );
}

export { AuthenticationExample as component, contents };
