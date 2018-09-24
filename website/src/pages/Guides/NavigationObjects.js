import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

export default function NavigationObjectGuide() {
  return (
    <React.Fragment>
      <Section
        title="The Properties of a Navigation Object"
        id="navigation-properties"
      >
        <Explanation>
          <p>
            The <IJS>navigation</IJS> object contains information about the
            previous navigation. It has two properties: <IJS>action</IJS> and{" "}
            <IJS>previous</IJS>.
          </p>
        </Explanation>
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
      </Section>
      <Section title="Usage" id="usage">
        <Explanation>
          <p>
            What is the point of the <IJS>navigation</IJS> object? It is there
            to provide you information about a navigation that doesn't make
            sense to attach to a <IJS>response</IJS> object.
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
        </Explanation>
      </Section>
    </React.Fragment>
  );
}
