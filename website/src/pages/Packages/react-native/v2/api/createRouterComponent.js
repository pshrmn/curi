import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "createRouterComponent-arguments"
};
const returnMeta = {
  title: "Return Value",
  hash: "createRouterComponent-return"
};
export const meta = {
  title: "createRouterComponent",
  hash: "createRouterComponent",
  children: [argumentsMeta, returnMeta]
};

export function CreateRouterComponentAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A higher-order component that returns a <IJS>Router</IJS> component.
      </p>

      <CodeBlock lang="jsx">
        {`import { createRouterComponent } from '@curi/react-native';

const router = createRouter(browser, routes);
const Router = createRouterComponent(router);`}
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
          meta={{ title: "router", hash: "createRouterComponent-router" }}
        >
          <p>
            A Curi{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v2" }}
              hash="curi"
            >
              router
            </Link>
            .
          </p>
        </HashSection>
      </HashSection>

      <HashSection tag="h3" meta={returnMeta}>
        <p>
          A component that sets routing context data. Any component that relies
          on routing data must be a descendant of the <IJS>Router</IJS>.
        </p>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "createRouterComponent-children" }}
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
