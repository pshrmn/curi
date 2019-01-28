import React from "react";

import {
  HashSection,
  Explanation,
  IJS,
  CodeSandboxDemo,
  OnGithub
} from "../../../components/example/common";

const meta = {
  title: "Modals"
};

export default function ModalExample() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <HashSection title="Explanation" id="explanation">
        <Explanation>
          <p>
            This example mimics the way that Pinterest works. Whether or not
            this is a good design pattern is up for debate, but at the very
            least it is helpful to see one way that you can do this with Curi.
          </p>

          <p>
            When you navigate to a "modal route" from within the application,
            the content will be displayed in a modal window (preserving the
            background content from the page that the user navigated from). If
            you load the same location manually, it will render the location in
            a full window.
          </p>

          <p>
            <IJS>navigation.previous</IJS> is used to render the base layer
            displayed under the modal. <IJS>previous</IJS> is the previous
            location's <IJS>response</IJS> object.
          </p>

          <p>
            Knowing whether to render a modal window or a full page can be
            tricky. One approach is to use <IJS>location.state</IJS> to attach a
            value to the location that indicates that you want to render a
            modal. The downside of using state is that is is persistent across
            refreshes and the user clicking the browser's forward/back buttons,
            which means that you also have to take those into consideration when
            testing the modal's behavior.
          </p>
        </Explanation>
      </HashSection>

      <HashSection title="Live Demo" id="demo">
        <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/vue/modal" />
      </HashSection>

      <OnGithub path="vue/modal" />
    </React.Fragment>
  );
}
