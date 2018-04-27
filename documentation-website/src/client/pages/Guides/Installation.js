import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section } from "../../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      The core Curi package to install is <IJS>@curi/core</IJS>.
    </p>
    <p>
      The router will also need a Hickory package (<IJS>@hickory/browser</IJS>,{" "}
      <IJS>@hickory/hash</IJS>, or <IJS>@hickory/in-memory</IJS>). Which Hickory
      package you need depends on the application, but the browser package is
      best for most websites.
    </p>
    <PrismBlock lang="bash">npm install @hickory/browser @curi/core</PrismBlock>

    <p>
      These packages can also be loaded from{" "}
      <a href="https://unpkg.com">Unpkg</a>.
    </p>

    <PrismBlock lang="markup">
      {`<script src="https://unpkg.com/@hickory/browser/dist/hickory-browser.min.js"></script>
<script src="https://unpkg.com/@curi/core/dist/curi.min.js"></script>`}
    </PrismBlock>

    <Section title="Promises" id="promises">
      <p>
        Curi uses Promises, so you may need to include a polyfill to add Promise
        support for older browsers (including IE 11).
      </p>
      <p>
        If you need a general ES2015 polyfill, you can check out the one
        provided by Babel's{" "}
        <a href="https://babeljs.io/docs/usage/polyfill/#usage-in-browser">
          babel-polyfill
        </a>{" "}
        package. If you only need a Promise polyfill, then you should check out
        the{" "}
        <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a>{" "}
        package or <a href="https://polyfill.io/v2/docs/">polyfill.io</a>.
      </p>
    </Section>

    <h2>Next</h2>
    <p>
      <Link to="Guide" params={{ slug: "getting-started" }}>
        Get started
      </Link>{" "}
      with Curi.
    </p>
  </BaseGuide>
);
