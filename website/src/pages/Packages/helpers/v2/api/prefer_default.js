import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS
} from "../../../../../components/package/common";

export const meta = {
  title: "prefer_default()",
  hash: "prefer_default"
};

export function PreferDefaultAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        When using dynamic import syntax (<IJS>import("someModule")</IJS>
        ), the resolved module is a module object containing all of the exports
        from that module. If the module has a default export (
        <IJS>export default ...</IJS>), that will be the module's{" "}
        <IJS>default</IJS> property. The <IJS>prefer_default()</IJS> function
        will resolve with the <IJS>default</IJS> property of the module if it
        exists and with the module if it does not.
      </p>

      <CodeBlock>
        {`import { prefer_default } from "@curi/helpers";

const routes = prepare_routes([
  {
    name: "Menu",
    path: "menu",
    resolve() {
      return import("./components/Menu")
        .then(prefer_default);
    },
    response({ resolved }) {
      return { body: resolved }
    }
  }
]);`}
      </CodeBlock>
    </HashSection>
  );
}
