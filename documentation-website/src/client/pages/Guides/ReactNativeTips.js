import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <SideBySide>
      <Explanation>
        <Note>
          This guide assumes that you are already familiar with React Native.
        </Note>
      </Explanation>
    </SideBySide>
    <Section title="Back Button" id="back-button">
      <SideBySide>
        <Explanation>
          <p>
            To add back button support, you need to use your <IJS>history</IJS>{" "}
            object (which you can use directly or access through your router).
          </p>
          <p>
            The <IJS>history.go()</IJS> method is used for jumping between
            locations, so passing it <IJS>-1</IJS> will jump back to the
            previous location.
          </p>
          <p>
            When the app is at the initial location, you may want to return{" "}
            <IJS>false</IJS> to close the app when the user presses the back
            button.
          </p>
        </Explanation>
        <CodeBlock>
          {`import { BackHandler } from 'react-native';

// create your router
const router = curi(history, routes);

BackHandler.addEventListener(
  "hardwareBackPress",
  () => {
    // close the app when pressing back button
    // while on the initial screen
    if (router.history.index === 0) {
      return false;
    }
    router.history.go(-1);
    return true;
  }
);`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <Section title="Components" id="components">
      <SideBySide>
        <Explanation>
          <p>
            The{" "}
            <Link to="Package" params={{ package: "react-native" }}>
              <IJS>@curi/react-native</IJS>
            </Link>{" "}
            package is quite similar to the{" "}
            <Link to="Package" params={{ package: "react" }}>
              <IJS>@curi/react</IJS>
            </Link>{" "}
            package. In fact, Curi's React Native package re-exports most of the
            components from the React package.
          </p>
        </Explanation>
      </SideBySide>
      <Subsection title={<Cmp>Link</Cmp>} id="components-link">
        <SideBySide>
          <Explanation>
            <p>
              The main difference is that they have different <Cmp>Link</Cmp>{" "}
              components. While the React package's <Cmp>Link</Cmp> renders an
              anchor by default, the React Native <Cmp>Link</Cmp> renders a{" "}
              <Cmp>TouchableHighlight</Cmp> by default.
            </p>
            <Note>
              Don't forget to wrap the <Cmp>Link</Cmp>'s text in a{" "}
              <Cmp>Text</Cmp>!
            </Note>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Link } from '@curi/react-native';

<Link to='Home'>
  <Text>Home</Text>
</Link>`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Subsection title={<Cmp>CuriProvider</Cmp>} id="componentsCuriProvider">
        <SideBySide>
          <Explanation>
            <p>
              <IJS>@curi/react</IJS> provides a <Cmp>CuriProvider</Cmp>{" "}
              component that will listen for new responses and re-render your
              application.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { CuriProvider } from '@curi/react-native';

import router from './router';

const App = () => (
  <CuriProvider router={router}>
    {({ response }) => {
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </CuriProvider>
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>
  </BaseGuide>
);
