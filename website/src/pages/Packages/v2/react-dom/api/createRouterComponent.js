import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

let argumentsMeta = {
  title: "Arguments",
  hash: "createRouterComponent-arguments"
};
let returnMeta = {
  title: "Return Value",
  hash: "createRouterComponent-return"
};
export let meta = {
  title: "createRouterComponent",
  hash: "createRouterComponent"
};

export function CreateRouterComponentAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        A higher-order component that returns a <IJS>Router</IJS> component.
      </Paragraph>

      <CodeBlock lang="jsx">
        {`import { createRouterComponent } from '@curi/react-dom';

let router = createRouter(browser, routes);
let Router = createRouterComponent(router);

ReactDOM.render((
  <Router>
    <App />
  </Router>
), node);`}
      </CodeBlock>

      <Note>
        <Paragraph>
          Why a higher-order component not regular component? Props signify
          values that can change, but an application should only ever have one
          router. Using a higher-order component hard-codes the provided{" "}
          <IJS>router</IJS> as the one and only router.
        </Paragraph>
      </Note>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "router", hash: "createRouterComponent-router" }}
        >
          <Paragraph>
            A Curi{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="curi"
            >
              router
            </Link>
            .
          </Paragraph>
        </HashSection>
      </HashSection>

      <HashSection tag="h3" meta={returnMeta}>
        <Paragraph>
          A component that sets routing context data. Any component that relies
          on routing data must be a descendant of the <IJS>Router</IJS>.
        </Paragraph>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "createRouterComponent-children" }}
        >
          <Paragraph>
            The <IJS>Router</IJS> takes any valid React node (elements, strings,
            etc.) as its <IJS>children</IJS>.
          </Paragraph>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
