import React from "react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS } from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The prefetch route interaction can be used to make data fetching calls
        prior to navigation by calling a route's <IJS>on.every()</IJS> function.
        This is different than calling the function while generating the
        response because this is done without actually changing locations.
      </p>
    }
  >
    <Note>
      You should only use this if you implement some sort of caching/lookup in
      your functions. The <IJS>on.every()</IJS> function will be re-called when
      the user actually navigates to the route, so the benefit comes from the
      using a cached value instead of sending a new request to your server.
    </Note>
    <APIBlock>
      <Section tag="h3" title="prefetch" id="prefetch">
        <SideBySide>
          <Explanation>
            <p>
              The default export function is a route interaction factory that
              will add an <IJS>prefetch</IJS> function to the router's{" "}
              <IJS>route</IJS> property.
            </p>
            <p>
              The prefetch route interaction allows you to call a route's{" "}
              <IJS>on.every()</IJS> function manually. Why would you want to do
              this? Prefetching data means that when users navigate, the new
              page will be full rendered faster because we already have the
              data.
            </p>
          </Explanation>

          <CodeBlock>
            {`import curi from '@curi/core';
import prefetch from '@curi/route-prefetch';

const router = curi(history, routes, {
  route: [prefetch()]
});
`}
          </CodeBlock>
        </SideBySide>

        <Subsection title="Arguments" id="arguments">
          <SideBySide>
            <Explanation>
              <table>
                <thead>
                  <tr>
                    <th>argument</th>
                    <th>description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>name</td>
                    <td>
                      the name of the route whose <IJS>on.every()</IJS> function
                      should be called.
                    </td>
                  </tr>
                  <tr>
                    <td>match</td>
                    <td>
                      route props that are used by the <IJS>on.every()</IJS>{" "}
                      function (the same ones that an <IJS>on.every()</IJS>{" "}
                      function expects).
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                This route interaction will only register routes that have a{" "}
                <IJS>on.every()</IJS> function.
              </p>
            </Explanation>
            <CodeBlock>
              {`// call a route's load function manually
router.route.prefetch('User', { params: { id: 2 }})`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
