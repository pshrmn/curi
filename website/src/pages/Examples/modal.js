import React from "react";

import {
  Page,
  HashSection,
  Paragraph,
  MultiSandbox,
  IJS
} from "../../components/example/common";

let meta = {
  title: "Modal Routes"
};

let explanationMeta = {
  title: "Explanation",
  hash: "explanation"
};
let demoMeta = {
  title: "Live Demo",
  hash: "demo"
};

let contents = [explanationMeta, demoMeta];

function ModalExample() {
  return (
    <Page title={meta.title}>
      <HashSection meta={explanationMeta} tag="h2">
        <Paragraph>
          A "modal" route can display content on top of other content.
        </Paragraph>

        <Paragraph>
          This example mimics the way that Pinterest works. Whether or not this
          is a good design pattern is up for debate, but at the very least it is
          helpful to see one way that you can do this with Curi.
        </Paragraph>

        <Paragraph>
          When you navigate to a "modal route" from within the application, the
          content will be displayed in a modal window (preserving the background
          content from the page that the user navigated from). If you load the
          same location manually, it will render the location in a full window.
        </Paragraph>

        <Paragraph>
          <IJS>navigation.previous</IJS> is used to render the base layer
          displayed under the modal. <IJS>previous</IJS> is the previous
          location's <IJS>response</IJS> object.
        </Paragraph>

        <Paragraph>
          Knowing whether to render a modal window or a full page can be tricky.
          One approach is to use <IJS>location.state</IJS> to attach a value to
          the location that indicates that you want to render a modal. The
          downside of using state is that is is persistent across refreshes and
          the user clicking the browser's forward/back buttons, which means that
          you also have to take those into consideration when testing the
          modal's behavior.
        </Paragraph>
      </HashSection>

      <HashSection meta={demoMeta} tag="h2">
        <MultiSandbox
          sandboxes={[
            {
              id: "github/pshrmn/curi/tree/master/examples/react/modal",
              name: "React"
            },
            {
              id: "github/pshrmn/curi/tree/master/examples/vue/modal",
              name: "Vue"
            }
          ]}
        />
      </HashSection>
    </Page>
  );
}

export { ModalExample as component, contents };
