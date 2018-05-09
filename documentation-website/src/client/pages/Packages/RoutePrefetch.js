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
      <div>
        <p>
          The prefetch route interaction can be used fetch data for a route
          prior to navigating. The interaction will call a route's{" "}
          <IJS>on.initial()</IJS> and <IJS>on.every()</IJS> functions (if they
          exist on the route).
        </p>
        <p>
          Prefetching data means that when users navigate, the new page will be
          full rendered faster because we already have the data.
        </p>
      </div>
    }
  >
    <SideBySide>
      <Explanation>
        <Note>
          You need to cache the results of <IJS>on.every()</IJS> because the
          function will be re-called when the user navigates to that route.The
          result of <IJS>on.initial()</IJS> is automatically re-used on
          subsequent calls, so you do not have to worry about caching it.
        </Note>
      </Explanation>
    </SideBySide>
    <APIBlock>
      <Section tag="h3" title="prefetch" id="prefetch">
        <SideBySide>
          <Explanation>
            <p>
              The default export function is a route interaction factory. When
              passed to a Curi router, a <IJS>route.prefetch()</IJS> will be
              available for calling a route's <IJS>on</IJS> functions.
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
                      The name of the route whose <IJS>on.every()</IJS> function
                      should be called.
                    </td>
                  </tr>
                  <tr>
                    <td>match</td>
                    <td>
                      Route props that are used by the <IJS>on.every()</IJS>{" "}
                      function (the same ones that an <IJS>on.every()</IJS>{" "}
                      function expects).
                    </td>
                  </tr>
                  <tr>
                    <td>which</td>
                    <td>
                      When provided, only the specified (value is{" "}
                      <IJS>true</IJS>) functions will be called. When not
                      provided, all available functions will be called.
                    </td>
                  </tr>
                </tbody>
              </table>
              <p>
                This route interaction will only register routes that have an{" "}
                <IJS>on.initial()</IJS> or <IJS>on.every()</IJS> function. If
                you try calling this for any routes with neither of those,{" "}
                <IJS>prefetch()</IJS> will resolve an object with an{" "}
                <IJS>error</IJS> property.
              </p>
            </Explanation>
            <CodeBlock>
              {`
{
  name: "User",
  path: "u/:id",
  on: {
    initial: () => {...},
    every: () => {...}
  }
}

// call a route's on.initial() and on.every() functions
router.route.prefetch(
  'User',
  { params: { id: 2 }}
)

// only call the route's on.initial() function
router.route.prefetch(
  'User',
  { params: { id: 3 }},
  { initial: true }
);`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
