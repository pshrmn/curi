import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

const meta = {
  title: "Authentication"
};

export default function AuthenticationExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Explanation" id="explanation">
        <p>
          Sometimes you will want to redirect based on the results of your{" "}
          <IJS>resolve</IJS> functions. For instance, you might see that a user
          is not authenticated and shouldn't be able to view a page.
        </p>

        <p>
          When this happens, your <IJS>response()</IJS> function should modify
          the response by calling its redirect method.
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
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/authentication" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/react/authentication">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
