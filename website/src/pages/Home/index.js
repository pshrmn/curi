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
      <SideBySide>
        <Explanation>
          <p>
            Curi cares about routing, you choose how you render. Curi currently
            supports{" "}
            <Link to="Package" params={{ package: "react-dom" }}>
              React DOM
            </Link>,{" "}
            <Link to="Package" params={{ package: "react-native" }}>
              React Native
            </Link>,{" "}
            <Link to="Package" params={{ package: "vue" }}>
              Vue
            </Link>, and{" "}
            <Link to="Package" params={{ package: "svelte" }}>
              Svelte
            </Link>. With a little elbow grease, Curi should work with any UI
            library.
          </p>
          <p>
            Ready to learn more? Get started with the{" "}
            <Link to="Guide" params={{ slug: "creating-a-router" }}>
              creating a router
            </Link>{" "}
            guide.
          </p>
          <p>
            Want to see Curi in action? The <Link to="Examples">examples</Link>{" "}
            section has a variety of demos showing off what you can do with
            Curi.
          </p>
        </Explanation>
      </SideBySide>
    </Content>
  );
}
