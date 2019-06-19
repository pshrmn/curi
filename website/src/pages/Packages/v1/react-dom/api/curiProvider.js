import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  ScrollableTable
} from "../../../../../components/package/common";

const argumentsMeta = {
  title: "Arguments",
  hash: "curiProvider-arguments"
};
const propsMeta = {
  title: "Props",
  hash: "curiProvider-props"
};
export const meta = {
  title: "curiProvider",
  hash: "curiProvider",
  children: [argumentsMeta, propsMeta]
};

export function CuriProviderAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The application needs a component at its root to re-render the
        application when new responses are emitted and to make routing related
        available through React's context. This component is created by passing
        the Curi <IJS>router</IJS> to the <IJS>curiProvider</IJS> function.
      </p>

      <Note>
        <p>
          Why does <IJS>@curi/react-dom</IJS> export a function to create a
          component and not just a component? Props signify values that can
          change, but an application should only ever have one router. By
          hard-coding the <IJS>router</IJS> into a component, we avoid having to
          handle the possibility of switching routers (which should not happen).
        </p>
      </Note>

      <Note>
        <p>
          All of the other components provided by <IJS>@curi/react-dom</IJS>{" "}
          must be descendants of the component created by{" "}
          <IJS>curiProvider</IJS>.
        </p>
      </Note>

      <CodeBlock lang="jsx">
        {`import { curiProvider } from '@curi/react-dom';

const router = curi(history, routes);
const Router = curiProvider(router);

function App() {
  return (
    <Router>
      {({ response, navigation, router }) => {
        const { body:Body } = response;
        return <Body response={response} />;
      }}
    </Router>
  );
}`}
      </CodeBlock>

      <HashSection tag="h3" meta={argumentsMeta}>
        <HashSection
          tag="h4"
          meta={{ title: "router", hash: "curiProvider-router" }}
        >
          <p>A Curi router.</p>

          <CodeBlock>
            {`import { curiProvider } from "@curi/react-dom";

const router = curi(history, routes);
const Router = curiProvider(router);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection
        tag="h3"
        meta={{ title: "Props", hash: "curiProvider-props" }}
      >
        <HashSection
          tag="h4"
          meta={{ title: "children", hash: "curiProvider-render" }}
        >
          <p>
            <IJS>children</IJS> is a render-invoked function. When it is called,
            it will be passed an object with three properties:
          </p>
          <ScrollableTable>
            <thead>
              <tr>
                <th>property</th>
                <th>description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>response</td>
                <td>the response object generated for the current location</td>
              </tr>
              <tr>
                <td>navigation</td>
                <td>
                  the <IJS>action</IJS> of the navigation and the{" "}
                  <IJS>previous</IJS> response object
                </td>
              </tr>
              <tr>
                <td>router</td>
                <td>the Curi router</td>
              </tr>
            </tbody>
          </ScrollableTable>
        </HashSection>
      </HashSection>
    </HashSection>
  );
}
