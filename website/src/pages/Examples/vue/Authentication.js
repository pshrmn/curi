import React from "react";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../../components/highlight/Inline";
import { CodeBlock } from "../../../components/layout/Groups";
import { Section } from "../../../components/layout/Sections";
import CodeSandboxDemo from "../../../components/CodeSandboxDemo";

export default function AuthenticationExample() {
  return (
    <React.Fragment>
      <Section title="Explanation" id="explanation">
        <p>
          Sometimes you will want to redirect based on the results of your{" "}
          <IJS>resolve</IJS> functions. For instance, you might see that a user
          is not authenticated and shouldn't be able to view a page.
        </p>

        <p>
          When this happens, the route's <IJS>response()</IJS> function should
          modify the response by calling its redirect method.
        </p>

        <CodeBlock lang="javascript">
          {`const routes = [
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
  ];`}
        </CodeBlock>
      </Section>

      <Section title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/authentication" />
      </Section>

      <Section title="On GitHub" id="source">
        If you want to run this code locally, the source code is available on
        GitHub{" "}
        <a href="https://github.com/pshrmn/curi/tree/master/examples/vue/authentication">
          here
        </a>.
      </Section>
    </React.Fragment>
  );
}
