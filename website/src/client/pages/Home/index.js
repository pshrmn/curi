import React from "react";
import { Link } from "@curi/react-dom";

import Content from "../../components/Content";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import {
  SideBySide,
  Explanation,
  CodeBlock
} from "../../components/SideBySide";

export default function HomePage() {
  return (
    <Content>
      <h1>Curi is a JavaScript router for single-page applications</h1>

      <SideBySide>
        <Explanation>
          <p>Curi cares about routing, not how you render.</p>
          <p>
            Rendering depends on the UI library that you are using. Currently,
            there are packages to support using Curi with{" "}
            <Link to="Package" params={{ package: "react" }}>
              React
            </Link>{" "}
            (DOM and{" "}
            <Link to="Package" params={{ package: "react-native" }}>
              React Native
            </Link>),{" "}
            <Link to="Package" params={{ package: "vue" }}>
              Vue
            </Link>, and{" "}
            <Link to="Package" params={{ package: "svelte" }}>
              Svelte
            </Link>, but with a little elbow grease Curi should work with any
            rendering library.
          </p>
          <p>
            Curious to see Curi in action? The{" "}
            <Link to="Examples">examples</Link> section has a variety of demos
            showing off what you can do with Curi.
          </p>
          <p>
            Ready to learn more? Check out the{" "}
            <Link to="Guide" params={{ slug: "creating-a-router" }}>
              creating a router
            </Link>{" "}
            guide.
          </p>
        </Explanation>
        <CodeBlock>
          {`import { curi } from '@curi/router';
import Browser from '@hickory/browser';

const history = Browser();
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  // more routes...
  { name: 'Not Found', path: '(.*)', ... }
];

const router = curi(history, routes);`}
        </CodeBlock>
      </SideBySide>
    </Content>
  );
}
