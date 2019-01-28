import React from "react";

import { HashSection, CodeBlock, IJS } from "../../components/guide/common";

export default function NavigationObjectGuide() {
  return (
    <React.Fragment>
      <HashSection
        title="The Properties of a Navigation Object"
        id="navigation-properties"
      >
        <p>
          The <IJS>navigation</IJS> object contains information about the
          previous navigation. It has two properties: <IJS>action</IJS> and{" "}
          <IJS>previous</IJS>.
        </p>

        <CodeBlock>
          {`{
  // the type of navigation,
  // either PUSH, REPLACE, or POP
  action: 'PUSH',

  // the previous response object
  // or null for the initial response
  previous: {
    name: 'Home',
    ...
  }
}`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Usage" id="usage">
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
