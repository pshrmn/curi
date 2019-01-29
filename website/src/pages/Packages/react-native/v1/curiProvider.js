import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note,
  ScrollableTable
} from "../../../../components/package/common";

export const meta = {
  title: "curiProvider()",
  hash: "curiProvider",
  children: [
    {
      title: "Arguments",
      hash: "curiProvider-arguments"
    },
    {
      title: "Props",
      hash: "curiProvider-props"
    }
  ]
};

export function CuriProviderAPI() {
  return (
    <HashSection title={meta.title} id={meta.hash}>
      <p>
        The application needs a component at its root to re-render the
        application when new responses are emitted and to make routing related
        available through React's context. This component is created by passing
        the Curi <IJS>router</IJS> to the <IJS>curiProvider()</IJS> function.
      </p>
      <Note>
        <p>
          Why does <IJS>@curi/react-native</IJS> export a function to create a
          component and not just a component? Props signify values that can
          change, but an application should only ever have one router. By
          hard-coding the <IJS>router</IJS> into a component, we avoid having to
          handle the possibility of switching routers (which should not happen).
        </p>
      </Note>
      <Note>
        <p>
          All of the other components provided by <IJS>@curi/react-native</IJS>{" "}
          must be descendants of the component created by{" "}
          <IJS>curiProvider()</IJS>.
        </p>
      </Note>

      <CodeBlock lang="jsx">
        {`import { curiProvider } from '@curi/react-native';

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

      <HashSection tag="h3" title="Arguments" id="curiProvider-arguments">
        <HashSection tag="h4" title="router" id="curiProvider-router">
          <p>A Curi router.</p>

          <CodeBlock>
            {`import { curiProvider } from "@curi/react-native";

const router = curi(history, routes);
const Router = curiProvider(router);`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection tag="h3" title="Props" id="curiProvider-props">
        <HashSection tag="h4" title="children" id="curiProvider-render">
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
