import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <SideBySide>
      <Explanation>
        <p>
          The main Curi package to install is <IJS>@curi/router</IJS>.
        </p>
        <p>
          The router will also need a Hickory package (<IJS>
            @hickory/browser
          </IJS>, <IJS>@hickory/hash</IJS>, or <IJS>@hickory/in-memory</IJS>).
          Which Hickory package you need depends on the application, but the
          browser package is best for most websites.
        </p>
      </Explanation>
      <CodeBlock lang="bash">
        npm install @hickory/browser @curi/router
      </CodeBlock>
    </SideBySide>

    <SideBySide>
      <Explanation>
        <p>
          These packages can also be loaded from{" "}
          <a href="https://unpkg.com">Unpkg</a>.
        </p>
      </Explanation>
      <CodeBlock lang="markup">
        {`<script
 src="https://unpkg.com/@hickory/browser/dist/hickory-browser.min.js"
></script>
<script
 src="https://unpkg.com/@curi/router/dist/curi.min.js"
></script>`}
      </CodeBlock>
    </SideBySide>

    <Section title="Promises" id="promises">
      <SideBySide>
        <Explanation>
          <p>
            Curi uses Promises, so you may need to include a polyfill to add
            Promise support for older browsers (including IE 11).
          </p>
          <p>
            If you need a general ES2015 polyfill, you can check out the one
            provided by Babel's{" "}
            <a href="https://babeljs.io/docs/usage/polyfill/#usage-in-browser">
              babel-polyfill
            </a>{" "}
            package. If you only need a Promise polyfill, then you should check
            out the{" "}
            <a href="https://github.com/stefanpenner/es6-promise">
              es6-promise
            </a>{" "}
            package or <a href="https://polyfill.io/v2/docs/">polyfill.io</a>.
          </p>
        </Explanation>
      </SideBySide>
    </Section>
  </BaseGuide>
);
