import React from "react";

import APIBlock from "../../../components/package/APIBlock";
import About from "../../../components/package/About";
import { Section } from "../../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../../components/layout/Groups";

export default class SideEffectScrollPkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              When Curi is running in a browser, it relies on the{" "}
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
                History API
              </a>{" "}
              to change locations, but this does not trigger scrolling to the
              top of the page when you navigate. This package provides a side
              effect function that will scroll to the top of the page whenever
              those functions are used for navigation.
            </p>
            <p>
              Other types of navigation, such as clicking the browser's back and
              forward buttons, will rely on the browser to correctly restore the
              scroll position.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section tag="h3" title="scrollEffect" id="scrollEffect">
            <CodeBlock>
              {`import { curi } from '@curi/router';
import scroll from '@curi/side-effect-scroll';

const router = curi(history, routes, {
  sideEffects: [scroll()]
});`}
            </CodeBlock>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
