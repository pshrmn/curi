import React from "react";

import {
  HashSection,
  CodeBlock,
  IJS,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Transitions"
};

export default function TransitionsExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <p>
          This example uses <IJS>react-transition-group</IJS> to animate
          navigation transitions.
        </p>

        <p>
          The <IJS>location.pathname</IJS> from the <IJS>response</IJS> is used
          to uniquely identify the content. The <IJS>pathname</IJS> is used
          instead of the <IJS>key</IJS> so that navigating to the same pathname
          as the current pathname does not cause a transition.
        </p>

        <CodeBlock lang="jsx">
          {`function render({ response }) {
  const { body:Body } = response;
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={500}
      >
        <Body response={response} />
      </CSSTransition>
    </TransitionGroup>
  );
}`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/react/transitions" />
      </HashSection>

      <OnGithub path="react/transitions" />
    </React.Fragment>
  );
}
