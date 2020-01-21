import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export let meta = {
  title: "announce",
  hash: "announce"
};

export function AnnounceAPI() {
  return (
    <HashSection meta={meta} tag="h2">
      <p>
        The <IJS>announce</IJS> side effect is used to announce navigation to
        screen readers. The announcement is done using an{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
          ARIA live region
        </a>
        .
      </p>

      <p>
        The side effect will create an element with a <IJS>aria-live</IJS>{" "}
        attribute and add it to the DOM. This element will be styled to not be
        displayed on screen (but not actually hidden) so that only screen
        readers detect it.
      </p>

      <Warning>
        <p>This side effect should only be used in the browser.</p>
      </Warning>

      <p>
        The <IJS>announce</IJS> function takes a single argument, which is a
        function that receives the object emitted by the router and returns the
        string that should be set for the screen reader to read.
      </p>

      <p>
        The DOM element's <IJS>aria-live</IJS> attribute will be{" "}
        <IJS>"assertive"</IJS> by default, but you can use the side-effect
        factory's second argument to pass an alternative (i.e.{" "}
        <IJS>"polite"</IJS>).
      </p>

      <CodeBlock>
        {`import { createRouter, announce } from '@curi/router';

let announcer = announce(
  ({ response }) => \`Navigated to \${response.meta.title}\`
);

let politeAnnouncer = announce(
  ({ response }) => \`Navigated to \${response.meta.title}\`,
  "polite"
);

let router = curi(history, routes, {
  sideEffects: [announcer]
});`}
      </CodeBlock>
    </HashSection>
  );
}
