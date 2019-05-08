import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export const meta = {
  title: "title",
  hash: "title"
};

export function TitleAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        The <IJS>title</IJS> side effect will set the document's title.
      </p>

      <Warning>
        <p>This side effect should only be used in the browser.</p>
      </Warning>

      <p>
        The function takes a single argument, which is a function that takes the
        object emitted by a router and returns the string to set as the title.
      </p>

      <CodeBlock>
        {`import { createRouter, title } from '@curi/router';

const router = createRouter(history, routes, {
  sideEffects: [
    title(({ response }) => {
      return \`\${response.meta.title} | My Site\`;
    })
  ]
});`}
      </CodeBlock>

      <p>
        The recommended approach for determining a title is to have routes set
        their <IJS>meta.title</IJS> property in their <IJS>respond</IJS> method.
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
