import React from "react";

import {
  Section,
  Explanation,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Installation"
};

export default function InstallationGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          Every application that uses Curi needs to install is{" "}
          <IJS>@curi/router</IJS>.
        </p>
        <p>
          You will also need a Hickory package (<IJS>@hickory/browser</IJS>,{" "}
          <IJS>@hickory/hash</IJS>, or <IJS>@hickory/in-memory</IJS>). Which
          package you need depends on the application, but the browser package
          is best for most websites.
        </p>
      </Explanation>
      <CodeBlock lang="bash">
        npm install @hickory/browser @curi/router
      </CodeBlock>

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
  src="https://unpkg.com/@curi/router/dist/curi-router.min.js"
></script>`}
      </CodeBlock>

      <Section title="Promises" id="promises">
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
            package or{" "}
            <a href="https://polyfill.io/v2/docs/features/">polyfill.io</a>.
          </p>
        </Explanation>
        <CodeBlock lang="html">
          {`<script
  src="https://cdn.polyfill.io/v2/polyfill.js?features=Promise"
></script>`}
        </CodeBlock>
      </Section>
    </React.Fragment>
  );
}
