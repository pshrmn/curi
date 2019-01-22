import React from "react";

import APIBlock from "../../../components/package/APIBlock";
import About from "../../../components/package/About";
import { InlineJS as IJS } from "../../../components/highlight/Inline";
import { Section } from "../../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../../components/layout/Groups";

export default class SideEffectTitlePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>
              This package adds a side effect to the router that updates the
              page's title as a result of navigation.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section tag="h3" title="titleEffect" id="titleEffect">
            <Explanation>
              <p>
                <IJS>@curi/side-effect-title</IJS> exports a function for
                creating a side effect that will update the page's title
                whenever a new response is created.
              </p>
              <p>
                When creating the title side effect, you pass it a function.
                That function will be passed the object emitted by the router
                (with <IJS>response</IJS>, <IJS>navigation</IJS>, and{" "}
                <IJS>router</IJS> properties). The function returns a string,
                which the side effect will set as the document's{" "}
                <IJS>title</IJS>.
              </p>
            </Explanation>
            <CodeBlock>
              {`import { curi } from '@curi/router';
import titleEffect from '@curi/side-effect-title';

const setTitle = titleEffect(({ response }) => {
  return \`\${response.title} | My Site\`;
});

const router = curi(history, routes, {
  sideEffects: [setTitle]
});`}
            </CodeBlock>

            <Explanation>
              <p>
                While you can use any properties of the <IJS>response</IJS> to
                generate the string, the <IJS>response.title</IJS> property is
                intended to be used with this side effect.
              </p>
            </Explanation>
            <CodeBlock>
              {`{
  name: "About",
  path: "about",
  response() {
    return {
      body: Home,
      title: "About"
    }
  }              
}
// when the About route matches, document.title = "About | My Site"`}
            </CodeBlock>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
