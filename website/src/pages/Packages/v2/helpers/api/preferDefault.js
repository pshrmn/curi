import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "preferDefault",
  hash: "preferDefault"
};

export function PreferDefaultAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        When using dynamic import syntax (<IJS>import("someModule")</IJS>
        ), the resolved module is a module object containing all of the exports
        from that module. If the module has a default export (
        <IJS>export default ...</IJS>), that will be the module's{" "}
        <IJS>default</IJS> property. The <IJS>preferDefault</IJS> function will
        resolve with the <IJS>default</IJS> property of the module if it exists
        and with the module if it does not.
      </p>

      <CodeBlock>
        {`import { preferDefault } from "@curi/helpers";

const routes = prepareRoutes([
  {
    name: "Menu",
    path: "menu",
    resolve() {
      return import("./components/Menu")
        .then(preferDefault);
    },
    respond({ resolved }) {
      return { body: resolved }
    }
  }
]);`}
      </CodeBlock>
    </HashSection>
  );
}
