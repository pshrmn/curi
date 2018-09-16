import React from "react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default function RouteActivePkg({ name, version, globalName }) {
  return (
    <BasePackage
      name={name}
      version={version}
      globalName={globalName}
      about={
        <p>
          The <IJS>@curi/route-active</IJS> package determines whether a route
          is "active" by comparing it to the current response. This can be
          restricted to complete matches or allow partial matches so that
          locations that represent an ancestor of the current location are also
          considered "active".
        </p>
      }
    >
      <APIBlock>
        <Section tag="h3" title="active" id="active">
          <SideBySide>
            <Explanation>
              <p>
                A function to create the active route interaction. When you
                create your router, the result is passed to the router using the
                `route` option, which will add an <IJS>active()</IJS> function
                to the router's route interactions.
              </p>
              <p>
                The interaction returns a boolean: <IJS>true</IJS> when a route
                is "active" (it matches the response's <IJS>location</IJS>) and{" "}
                <IJS>false</IJS> when it does not.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curi } from '@curi/router';
import active from '@curi/route-active';

const router = curi(history, routes, {
  route: [active()]
});`}
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
                      <td>the name of the route to check if it is active</td>
                    </tr>
                    <tr>
                      <td>response</td>
                      <td>the response to check the route against.</td>
                    </tr>
                    <tr>
                      <td>params</td>
                      <td>
                        any route params for the route that is being checked
                      </td>
                    </tr>
                    <tr>
                      <td>partial</td>
                      <td>
                        when <IJS>true</IJS>, ancestor routes can be considered
                        active. (default <IJS>false</IJS>)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Explanation>
              <CodeBlock>
                {`const isActive = router.route.active(
  'Some Route',
  response,
  { id: 10 },
  false
);`}
              </CodeBlock>
            </SideBySide>
          </Subsection>
        </Section>
      </APIBlock>
    </BasePackage>
  );
}
