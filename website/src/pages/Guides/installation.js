import React from "react";

import {
  HashSection,
  TitledPlainSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Installation"
};

let npmMeta = {
  title: "NPM",
  hash: "npm"
};

let unpkgMeta = {
  title: "Unpkg",
  hash: "unpkg"
};

let promisesMeta = {
  title: "Promises",
  hash: "promises"
};

let contents = [npmMeta, unpkgMeta, promisesMeta];

function InstallationGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title} />

      <HashSection meta={npmMeta} tag="h2">
        <Paragraph>
          There are a number of Curi packages, all of which can be installed
          using NPM. The only one that every application requires is{" "}
          <IJS>@curi/router</IJS>, which provides the core routing/navigation
          functionality.
        </Paragraph>

        <Paragraph>
          Curi also requires that you create your own history object. There are
          three packages to choose from: <IJS>@hickory/browser</IJS>,{" "}
          <IJS>@hickory/hash</IJS>, and <IJS>@hickory/in-memory</IJS>. Which
          package you need depends on the application, but the browser package
          is best for most websites.
        </Paragraph>

        <CodeBlock lang="bash">
          npm install @hickory/browser @curi/router
        </CodeBlock>
      </HashSection>

      <HashSection meta={unpkgMeta} tag="h2">
        <Paragraph>
          These packages can also be loaded from{" "}
          <a href="https://unpkg.com">Unpkg</a>.
        </Paragraph>

        <CodeBlock lang="markup">
          {`<script
  src="https://unpkg.com/@hickory/browser/dist/hickory-browser.min.js"
></script>
<script
  src="https://unpkg.com/@curi/router/dist/curi-router.min.js"
></script>`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={promisesMeta} tag="h2">
        <Paragraph>
          Curi uses Promises, so you may need to include a polyfill to add
          Promise support for older browsers (including IE 11).
        </Paragraph>

        <Paragraph>
          If you need a general ES2015 polyfill, you can check out the one
          provided by Babel's{" "}
          <a href="https://babeljs.io/docs/usage/polyfill/#usage-in-browser">
            babel-polyfill
          </a>{" "}
          package. If you only need a Promise polyfill,{" "}
          <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a>{" "}
          package or{" "}
          <a href="https://polyfill.io/v2/docs/features/">polyfill.io</a> should
          do the trick.
        </Paragraph>

        <CodeBlock lang="html">
          {`<script
  src="https://cdn.polyfill.io/v2/polyfill.js?features=Promise"
></script>`}
        </CodeBlock>
      </HashSection>
    </React.Fragment>
  );
}

export { InstallationGuide as component, contents };
