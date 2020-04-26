import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export let meta = {
  title: "CuriPlugin",
  hash: "CuriPlugin"
};

export function CuriPluginAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>What does the plugin do?</Paragraph>
      <ol>
        <li>
          Register <IJS>curi-link</IJS> and <IJS>curi-block</IJS> components
          with Vue so they can be used anywhere within your application without
          manually importing.
        </li>
        <li>
          Makes the Curi router globally available to Vue components as{" "}
          <IJS>$router</IJS>.
        </li>
        <li>
          Makes responses and navigations available to components through the{" "}
          <IJS>$curi</IJS> property. <IJS>$curi</IJS> is responsive, so when a
          new response is emitted, <IJS>$curi.response</IJS> and{" "}
          <IJS>$curi.navigation</IJS> will automatically be updated.
        </li>
      </ol>

      <CodeBlock>
        {`import { CuriPlugin } from '@curi/vue';

let router = createRouter(history, routes);
Vue.use(CuriPlugin, { router });`}
      </CodeBlock>
    </HashSection>
  );
}
