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
          Prefetching data means results in faster renders after navigation
          because you don't have to wait for the data to load.
        </p>
      </div>
    }
  >
    <SideBySide>
      <Explanation>
        <Note>
          Prefetching <IJS>on.every()</IJS> calls is only beneficial if you
          cache the results because the function will be re-called when the user
          navigates to that route. The result of <IJS>on.initial()</IJS> is
          automatically re-used on subsequent calls, so you do not have to worry
          about caching it.
        </Note>
      </Explanation>
    </SideBySide>
    <APIBlock>
      <Section tag="h3" title="prefetch" id="prefetch">
        <SideBySide>
          <Explanation>
            <p>
              A function to create the prefetch route interaction. When you
              create your router, the result is passed to the router using the
              `route` option, which will add a <IJS>prefetch()</IJS> function to
              the router's route interactions.
            </p>
          </Explanation>

          <CodeBlock>
            {`import { curi } from '@curi/router';
import prefetch from '@curi/route-prefetch';

const router = curi(history, routes, {
  route: [prefetch()]
});

router.route.prefetch("Some Route");`}
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
                    <td>The name of the route to prefetch.</td>
                  </tr>
                  <tr>
                    <td>match</td>
                    <td>
                      Route props that are used by the <IJS>on</IJS> functions.
                    </td>
                  </tr>
                  <tr>
                    <td>which</td>
                    <td>
                      An array whose values are the names of the{" "}
                      <IJS>match</IJS> functions that should be called. If this
                      array is not provided, all available functions will be
                      called.
                    </td>
                  </tr>
                </tbody>
              </table>
              <Note>
                <p>
                  This route interaction will only register routes that have an{" "}
                  <IJS>on.initial()</IJS> or <IJS>on.every()</IJS> function. If
                  you try calling this for any routes with neither of those,{" "}
                  <IJS>prefetch()</IJS> will resolve an object with an{" "}
                  <IJS>error</IJS> property.
                </p>
              </Note>
            </Explanation>
            <CodeBlock>
              {`
{
  name: "User",
  path: "u/:id",
  match: {
    one: () => {...},
    two: () => {...}
  }
}

// call a route's match.one() and match.two() functions
router.route.prefetch(
  'User',
  { params: { id: 2 }}
)

// only call the route's match.one() function
router.route.prefetch(
  'User',
  { params: { id: 3 }},
  ['one']
);`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
