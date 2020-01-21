import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export let meta = {
  title: "scroll",
  hash: "scroll"
};

export function ScrollAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The <IJS>scroll</IJS> side effect will scroll the page after a
        navigation.
      </p>

      <Warning>
        <p>This side effect should only be used in the browser.</p>
      </Warning>

      <p>
        When Curi is running in a browser, it relies on the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
          History API
        </a>{" "}
        to change locations. Navigating using the History API does not trigger
        scrolling to the top of the page after navigation, so this side effect
        scrolls for you.
      </p>

      <p>
        Pop navigation, such as clicking the browser's back and forward buttons,
        will rely on the browser to correctly restore the scroll position.
      </p>

      <CodeBlock>
        {`import { createRouter, scroll } from "@curi/router";

let router = createRouter(browser, routes, {
  sideEffects: [scroll()]
});`}
      </CodeBlock>
    </HashSection>
  );
}
