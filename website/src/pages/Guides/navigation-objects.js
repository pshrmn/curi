import React from "react";

import {
  TitledPlainSection,
  HashSection,
  CodeBlock,
  IJS
} from "../../components/guide/common";

const meta = {
  title: "Navigation Objects"
};

const propertiesMeta = {
  title: "The Properties of a Navigation Object",
  hash: "navigation-properties"
};

const usageMeta = {
  title: "Usage",
  hash: "usage"
};

const contents = [propertiesMeta, usageMeta];

function NavigationObjectGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <p>
          The <IJS>navigation</IJS> object contains information about the
          previous location and how the user navigated to the current location.
        </p>
      </TitledPlainSection>

      <HashSection meta={propertiesMeta} tag="h2">
        <p>
          A navigation object has two properties: <IJS>action</IJS> and{" "}
          <IJS>previous</IJS>.
        </p>

        <CodeBlock>
          {`{
  // the type of navigation,
  // either push, replace, or pop
  action: 'push',

  // the previous response object
  // or null for the initial response
  previous: {
    name: 'Home',
    ...
  }
}`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={usageMeta} tag="h2">
        <p>
          What is the point of the <IJS>navigation</IJS> object? It is there to
          provide you information about a navigation that doesn't make sense to
          attach to a <IJS>response</IJS> object.
        </p>

        <p>
          One usage of it would be to display a Pinterest/Twitter style modal.
          You could render the background using the previous response while
          rendering the modal using the new response.
        </p>

        <p>
          Another use case may be to determine how to transition between two
          locations, either using the <IJS>action</IJS> to determine{" "}
          <em>how</em> the application navigated or the <IJS>previous</IJS>{" "}
          response to map between two routes.
        </p>
      </HashSection>
    </React.Fragment>
  );
}

export { NavigationObjectGuide as component, contents };
