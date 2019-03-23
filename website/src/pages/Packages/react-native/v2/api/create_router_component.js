import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Cmp,
  Note
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "create_router_component-arguments"
};
const propsMeta = {
  title: "Router",
  hash: "create_router_component-Router"
};
export const meta = {
  title: "create_router_component",
  hash: "create_router_component",
  children: [argumentsMeta, propsMeta]
};

export function CreateRouterComponentAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A higher-order component that returns a <IJS>Router</IJS> component.
      </p>

      <CodeBlock lang="jsx">
        {`import { create_router_component } from '@curi/react-native';

const router = curi(Browser, routes);
const Router = create_router_component(router);

ReactDOM.render((
  <Router>
    <App />
  </Router>
), node);`}
      </CodeBlock>

      <Note>
        <p>
          Why a higher-order component not regular component? Props signify
          values that can change, but an application should only ever have one
          router. Using a higher-order component hard-codes the provided{" "}
          <IJS>router</IJS> as the one and only router.
        </p>
      </Note>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "router", hash: "create_router_component-router" }}
        >
          <p>
            A Curi{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v1" }}
              hash="curi"
            >
              router
            </Link>
            .
          </p>
        </HashSection>
      </HashSection>

      <HashSection
        tag="h3"
        meta={{ title: "Router", hash: "create_router_component-Router" }}
      >
        <p>
          The <IJS>Router</IJS> sets routing context data. Any component that
          relies on routing data must be a descendant of the <IJS>Router</IJS>.
        </p>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "create_router_component-render" }}
        >
          <p>
            The <IJS>Router</IJS> takes any valid React node (elements, strings,
            etc.) as its <IJS>children</IJS>.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
