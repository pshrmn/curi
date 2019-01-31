import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  Warning
} from "../../../../../components/package/common";

export const meta = {
  title: "ariaLiveEffect()",
  hash: "ariaLiveEffect"
};

export function AriaLiveAPI() {
  return (
    <HashSection meta={meta}>
      <p>
        When you create an ARIA live side effect, an element with a{" "}
        <IJS>aria-live</IJS> attribute will be added to the DOM. This element
        will be styled to not be displayed on screen (but not actually hidden)
        so that only screen readers detect it.
      </p>

      <Warning>
        <p>This side-effect should only be used in the browser.</p>
      </Warning>

      <p>
        The side-effect factory takes a function, which will receives the same
        arguments as an observer (<IJS>response</IJS>, <IJS>navigation</IJS>,
        and <IJS>router</IJS>). Using the objects, the function returns a
        string, which is the message about the navigation that will be read by
        the screen reader.
      </p>

      <p>
        The DOM element's <IJS>aria-live</IJS> attribute will be{" "}
        <IJS>"assertive"</IJS> by default, but you can use the side-effect
        factory's second argument to pass an alternative (i.e.{" "}
        <IJS>>"polite"</IJS>).
      </p>

      <CodeBlock>
        {`import { curi } from '@curi/router';
import ariaLive from '@curi/side-effect-aria-live';

const announcer = ariaLive(
  ({ response }) => \`Navigated to \${response.title}\`
);

const politeAnnouncer = ariaLive(
  ({ response }) => \`Navigated to \${response.title}\`,
  "polite"
);

const router = curi(history, routes, {
  sideEffects: [announcer]
});`}
      </CodeBlock>
    </HashSection>
  );
}
