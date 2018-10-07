import React from "react";
import { Link } from "@curi/react-dom";

import APIBlock from "../../components/package/APIBlock";
import About from "../../components/package/About";
import { InlineJS as IJS } from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";
import { Warning } from "../../components/Messages";

export default class SideEffectAriaLivePkg extends React.PureComponent {
  render() {
    const { name, version, globalName } = this.props;
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              When you navigate in a non-single-page application, users who rely
              on a screen reader will get an announcement about the navigation.
              Unfortunately, this behavior does not natively exist with
              single-page applications and the History API.
            </p>
            <p>
              This side-effect usea{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions">
                ARIA live regions
              </a>{" "}
              to announce navigations to users who use screen readers.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section tag="h3" title="ariaLiveEffect" id="ariaLiveEffect">
            <Explanation>
              <p>
                When you create an ARIA live side effect, an element with a{" "}
                <IJS>aria-live</IJS> attribute will be added to the DOM. This
                element will be styled to not be displayed on screen (but not
                actually hidden) so that only screen readers detect it.
              </p>
              <Warning>
                This side-effect should only be used in the browser.
              </Warning>
              <p>
                The side-effect factory takes a function, which will receives
                the same arguments as an observer (<IJS>response</IJS>,{" "}
                <IJS>navigation</IJS>, and <IJS>router</IJS>). Using the
                objects, the function returns a string, which is the message
                about the navigation that will be read by the screen reader.
              </p>
              <p>
                The DOM element's <IJS>aria-live</IJS> attribute will be{" "}
                <IJS>"assertive"</IJS> by default, but you can use the
                side-effect factory's second argument to pass an alternative
                (i.e. <IJS>>"polite"</IJS>).
              </p>
            </Explanation>
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
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
