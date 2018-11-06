import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Explanation, CodeBlock } from "../../components/layout/Groups";

export default function HomePage() {
  return (
    <React.Fragment>
      <h1>Curi is a JavaScript router for single-page applications</h1>
      <CodeBlock>
        {`import { curi, prepareRoutes } from '@curi/router';
import Browser from '@hickory/browser';

const history = Browser();
const routes = prepareRoutes([
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  // more routes...
  { name: 'Not Found', path: '(.*)', ... }
]);

const router = curi(history, routes);`}
      </CodeBlock>

      <Explanation>
        <p>
          Curi cares about routing, you choose how you render. Curi currently
          supports{" "}
          <Link name="Package" params={{ package: "react-dom" }}>
            React DOM
          </Link>,{" "}
          <Link name="Package" params={{ package: "react-native" }}>
            React Native
          </Link>,{" "}
          <Link name="Package" params={{ package: "vue" }}>
            Vue
          </Link>, and{" "}
          <Link name="Package" params={{ package: "svelte" }}>
            Svelte
          </Link>. With a little elbow grease, Curi should work with any UI
          library.
        </p>
        <p>
          Ready to learn more? Get started with the{" "}
          <Link name="Guide" params={{ slug: "creating-a-router" }}>
            creating a router
          </Link>{" "}
          guide.
        </p>
        <p>
          Want to see Curi in action? The <Link name="Examples">examples</Link>{" "}
          section has a variety of demos showing off what you can do with Curi.
        </p>
      </Explanation>
    </React.Fragment>
  );
}
