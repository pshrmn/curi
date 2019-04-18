import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Note
} from "../../../../../components/package/common";

export const meta = {
  title: "titleEffect",
  hash: "titleEffect"
};

export function TitleAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        <IJS>@curi/side-effect-title</IJS> exports a function for creating a
        side effect that will update the page's title whenever a new response is
        created.
      </p>
      <p>
        When creating the title side effect, you pass it a function. That
        function will be passed the object emitted by the router (with{" "}
        <IJS>response</IJS>, <IJS>navigation</IJS>, and <IJS>router</IJS>{" "}
        properties). The function returns a string, which the side effect will
        set as the document's <IJS>title</IJS>.
      </p>

      <CodeBlock>
        {`import { curi } from '@curi/router';
import titleEffect from '@curi/side-effect-title';

const setTitle = titleEffect(({ response }) => {
  return \`\${response.meta.title} | My Site\`;
});

const router = curi(history, routes, {
  sideEffects: [setTitle]
});`}
      </CodeBlock>

      <p>
        The preferred method for setting a response's title is with the{" "}
        <IJS>meta</IJS> property.
      </p>

      <CodeBlock>
        {`{
  name: "About",
  path: "about",
  respond() {
    return {
      body: About,
      meta: {
        title: "About"
      }
    }
  }
}
// when the About route matches, document.title = "About | My Site"`}
      </CodeBlock>
    </HashSection>
  );
}
