import React from "react";
import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        The prefetch add-on can be used to make data fetching calls prior to
        navigation by calling a route's <IJS>on.every()</IJS> function. This is
        different than calling the function while generating the response
        because this is done without actually changing locations.
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
      <Section tag="h3" title="createPrefetchAddon" id="createPrefetchAddon">
        <p>
          The default export function is an add-on factory that will add an{" "}
          <IJS>prefetch</IJS> function to your router object's add-on property.
        </p>

        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';
import prefetch from '@curi/addon-prefetch';

const router = curi(history, routes, { addons: [prefetch()] });
`}
        </PrismBlock>

        <p>
          The prefetch add-on allows you to call a route's <IJS>on.every()</IJS>{" "}
          function manually. Why would you want to do this? Prefetching data
          means that when users navigate, the new page will be full rendered
          faster because we already have the data.
        </p>

        <Subsection title="Arguments" id="arguments">
          <PrismBlock lang="javascript">
            {`// call a route's load function manually
router.addons.prefetch('User', { params: { id: 2 }})`}
          </PrismBlock>
          <ul>
            <li>
              <IJS>name</IJS> - the name of the route whose{" "}
              <IJS>on.every()</IJS> function should be called.
            </li>
            <li>
              <IJS>props</IJS> - route props that are used by the{" "}
              <IJS>on.every()</IJS> function (the same ones that a{" "}
              <IJS>on.every()</IJS> function expects).
            </li>
          </ul>
          <p>
            This add-on will only register routes that have a{" "}
            <IJS>on.every()</IJS> function.
          </p>
        </Subsection>
      </Section>
    </APIBlock>
  </BasePackage>
);
