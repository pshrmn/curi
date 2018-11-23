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
      <Explanation>
        <h1>Curi is a JavaScript router for single-page applications</h1>
        <p>
          Curi can provide routing for any JavaScript application, no matter how
          it is rendered. Curi provides packages to integrate the router with{" "}
          <Link name="Package" params={{ package: "react-dom" }}>
            React DOM
          </Link>,{" "}
          <Link name="Package" params={{ package: "react-native" }}>
            React Native
          </Link>,{" "}
          <Link name="Package" params={{ package: "vue" }}>
            Vue
          </Link>{" "}
          (in beta), and{" "}
          <Link name="Package" params={{ package: "svelte" }}>
            Svelte
          </Link>{" "}
          (in beta).
        </p>
      </Explanation>

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
        <h2>Ready to learn?</h2>
        <p>
          The{" "}
          <Link name="Guide" params={{ slug: "getting-started" }}>
            getting started
          </Link>{" "}
          guide will put you on the right path. If you prefer to learn through
          tutorials, there are{" "}
          <Link name="Tutorial" params={{ slug: "react-basics" }}>
            React DOM
          </Link>{" "}
          and{" "}
          <Link name="Tutorial" params={{ slug: "vue-basics" }}>
            Vue
          </Link>{" "}
          tutorials to help guide you.
        </p>
      </Explanation>

      <Explanation>
        <h2>Examples</h2>
        <p>
          Want to see Curi in action? The <Link name="Examples">examples</Link>{" "}
          section has a variety of demos showing off what you can do with Curi.
        </p>
      </Explanation>
    </React.Fragment>
  );
}
