import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p />
    <Note>
      This guide assumes that you are already familiar with React Native.
    </Note>
    <Section title="Back Button" id="back-button">
      To add back button support, you just need to use your <IJS>history</IJS>{" "}
      object (which you can use directly or access through your router).
      <PrismBlock lang="javascript">
        {`import { BackHandler } from 'react-native';

// create your router
const router = curi(history, routes);

BackHandler.addEventListener("hardwareBackPress", () => {
  // close the app when pressing back button on initial screen
  if (router.history.index === 0) {
    return false;
  }
  router.history.go(-1);
  return true;
});`}
      </PrismBlock>
    </Section>
    <Section title="Components" id="components">
      <p>
        The{" "}
        <Link to="Package" params={{ package: "react-native" }}>
          <IJS>@curi/react-native</IJS>
        </Link>{" "}
        package is quite similar to the{" "}
        <Link to="Package" params={{ package: "react" }}>
          <IJS>@curi/react</IJS>
        </Link>{" "}
        package. In fact, Curi's React Native package just re-exports most of
        the components from the React package.
      </p>
      <Subsection title={<Cmp>Link</Cmp>} id="components-link">
        <p>
          The main difference is that they have different <Cmp>Link</Cmp>{" "}
          components. While the React package's <Cmp>Link</Cmp> renders an
          anchor by default, the React Native <Cmp>Link</Cmp> renders a{" "}
          <Cmp>TouchableHighlight</Cmp> by default.
        </p>
        <Note>
          Don't forget to wrap the <Cmp>Link</Cmp>'s text in a <Cmp>Text</Cmp>!
        </Note>
        <PrismBlock lang="jsx">
          {`import { Link } from '@curi/react-native';

<Link to='Home'>
  <Text>Home</Text>
</Link>`}
        </PrismBlock>
      </Subsection>
      <Subsection title={<Cmp>CuriProvider</Cmp>} id="componentsCuriProvider">
        <p>
          <IJS>@curi/react</IJS> provides a <Cmp>CuriProvider</Cmp> component
          that will listen for new responses and re-render your application.
        </p>
        <PrismBlock lang="jsx">
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
        </PrismBlock>
      </Subsection>
    </Section>
  </BaseGuide>
);
