import React from "react";

import {
  Section,
  Explanation,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Authentication"
};

export default function AuthenticationExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <Explanation>
          <p>
            Sometimes you will want to redirect based on the results of your{" "}
            <IJS>resolve</IJS> functions. For instance, you might see that a
            user is not authenticated and shouldn't be able to view a page.
          </p>

          <p>
            A <IJS>response()</IJS> function can modify the response by setting
            a <IJS>redirectTo</IJS> property on its return object. Curi will
            automatically (unless configured not to) redirect to that location.
          </p>
        </Explanation>

        <CodeBlock lang="javascript">
          {`const routes = prepareRoutes([
  // ...,
  {
    name: 'Protected',
    path: 'super-secret',
    response: () => {
      if (!store.userIsAuthenticated) {
        return {
          redirectTo: { name: "Login" },
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
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/svelte/redirects" />
      </Section>

      <OnGithub path="svelte/redirects" />
    </React.Fragment>
  );
}
