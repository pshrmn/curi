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
  hash: "curiProvider-arguments"
};
const propsMeta = {
  title: "Router",
  hash: "curiProvider-Router"
};
export const meta = {
  title: "curiProvider()",
  hash: "curiProvider",
  children: [argumentsMeta, propsMeta]
};

export function CuriProviderAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        A higher-order component that returns a <IJS>Router</IJS> component.
      </p>

      <CodeBlock lang="jsx">
        {`import { curiProvider } from '@curi/react-native';

const router = curi(history, routes);
const Router = curiProvider(router);

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
          meta={{ title: "router", hash: "curiProvider-router" }}
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
        meta={{ title: "Router", hash: "curiProvider-Router" }}
      >
        <p>
          The <Cmp>Router</Cmp> sets routing context data. Any component that
          relies on routing data (use)
        </p>

        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "curiProvider-render" }}
        >
          <p>
            The <Cmp>Router</Cmp> takes any valid React node (elements, strings,
            etc.) as its <IJS>children</IJS>.
          </p>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
