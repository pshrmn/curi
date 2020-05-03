import React from "react";

import {
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export let meta = {
  title: "title",
  hash: "title"
};

export function TitleAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <Paragraph>
        The <IJS>title</IJS> side effect will set the document's title.
      </Paragraph>

      <Warning>
        <Paragraph>
          This side effect should only be used in the browser.
        </Paragraph>
      </Warning>

      <Paragraph>
        The function takes a single argument, which is a function that takes the
        object emitted by a router and returns the string to set as the title.
      </Paragraph>

      <CodeBlock>
        {`import { createRouter, title } from '@curi/router';

let router = createRouter(history, routes, {
  sideEffects: [
    title(({ response }) => {
      return \`\${response.meta.title} | My Site\`;
    })
  ]
});`}
      </CodeBlock>

      <Paragraph>
        The recommended approach for determining a title is to have routes set
        their <IJS>meta.title</IJS> property in their <IJS>respond</IJS> method.
      </Paragraph>

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
