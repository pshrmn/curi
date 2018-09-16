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

export default function RouteAncestorsPkg({ name, version, globalName }) {
  return (
    <BasePackage
      name={name}
      version={version}
      globalName={globalName}
      about={
        <p>
          The <IJS>@curi/route-ancestors</IJS> route interaction returns the
          names of ancestor routes, which can be useful for generating
          breadcrumb links.
        </p>
      }
    >
      <APIBlock>
        <Section tag="h3" title="ancestors" id="ancestors">
          <SideBySide>
            <Explanation>
              <p>
                A function to create the ancestors route interaction. When you
                create your router, the result is passed to the router using the
                `route` option, which will add an <IJS>ancestors()</IJS>{" "}
                function to the router's route interactions.
              </p>
              <p>
                The interaction returns the name of an ancestor route a given
                level "up" from the route. If no level is provided, then it will
                return an array of the names of all ancestor routes (from most
                ancient to parent).
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curi } from '@curi/router';
import ancestors from '@curi/route-ancestors';

const routes = [
  {
    name: 'Grandparent', path: 'g',
    children: [
      {
        name: 'Parent', path: 'p',
        children: [
          { name: 'Child', path: 'c' }
        ]
      }
    ]
  }
];

const router = curi(history,routes, {
  route: [ancestors()]
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
                      <td>the name of the route to get ancestors of</td>
                    </tr>
                    <tr>
                      <td>level</td>
                      <td>
                        a number of levels "up" to get the ancestor name of. If
                        this argument is not provided, the interaction will
                        return an array of all ancestor routes names (from most
                        ancient to parent).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Explanation>
              <CodeBlock>
                {`const parent = router.route.ancestors('Child', 1);
// parent === 'Parent'
const ancestors = router.route.ancestors('Child');
// ancestors === ['Grandparent', 'Parent']`}
              </CodeBlock>
            </SideBySide>
          </Subsection>
        </Section>
      </APIBlock>
    </BasePackage>
  );
}
