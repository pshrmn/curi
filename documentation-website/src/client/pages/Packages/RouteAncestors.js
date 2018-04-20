import React from "react";
import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The <IJS>@curi/route-ancestors</IJS> route interaction allows you to get
        the names of ancestor routes, which can be useful for generating
        breadcrumb links.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="ancestors" id="ancestors">
        <p>
          The default export is a route interaction factory that will add an{" "}
          <IJS>ancestors</IJS> function to your router object's <IJS>route</IJS>{" "}
          property.
        </p>
        <p>
          The interaction returns the name of an ancestor route a given level
          "up" from the route. If no level is provided, then it will return an
          array of the names of all ancestor routes (from most ancient to
          parent).
        </p>
        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';
import ancestors from '@curi/route-ancestors';

const routes = [
  {
    name: 'Grandparent', path: '0',
    children: [
      {
        name: 'Parent', path: '1',
        children: [
          {
            name: 'Child',
            path: '2'
          }
        ]
      }
    ]
  }
];

const router = curi(history,routes, {
  route: [ancestors()]
});`}
        </PrismBlock>

        <Subsection title="Arguments" id="arguments">
          <ul>
            <li>
              <IJS>name</IJS> - the name of the route to get ancestors of.
            </li>
            <li>
              <IJS>level</IJS> - a number of levels "up" to get the ancestor
              name of. If this argument is not provided, the interaction will
              return an array of all ancestor routes names (from most ancient to
              parent).
            </li>
          </ul>

          <PrismBlock lang="javascript">
            {`const parent = router.route.ancestors('Child', 1);
// parent === 'Parent'
const ancestors = router.route.ancestors('Child');
// ancestors === ['Grandparent', 'Parent']`}
          </PrismBlock>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
