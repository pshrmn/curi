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
      </Subsection>
      <Subsection title="Base" id="components-base">
        <p>
          With React Native, components need to setup any subscribers
          themselves. There are a couple of different approaches to
          accomplishing this.
        </p>
        <p>
          The important thing to know here is that Curi needs to place some
          variables on React's <IJS>context</IJS> so that nested components can
          easily access them. It does this using a <Cmp>CuriBase</Cmp>{" "}
          component.
        </p>
        <Subsection
          tag="h4"
          title={<Cmp>ResponsiveBase</Cmp>}
          id="components-base-responsivebase"
        >
          <p>
            <IJS>@curi/react</IJS> provides a <Cmp>ResponsiveBase</Cmp>{" "}
            component that will listen for new responses and re-render your
            application. It renders a <Cmp>CuriBase</Cmp> internally.
          </p>
          <PrismBlock lang="jsx">
            {`import { ResponsiveBase } from '@curi/react-native';

import router from './router';
import render from './render';

const App = () => (
  <ResponsiveBase router={router} render={render} />
);`}
          </PrismBlock>
        </Subsection>
        <Subsection tag="h4" title="Redux" id="components-base-redux">
          <p>
            If you are using Redux in your application, you can use the{" "}
            <Link to="Package" params={{ package: "redux" }}>
              <IJS>@curi/redux</IJS>
            </Link>{" "}
            package to add Curi data to your store and automatically update your
            store when new responses are emitted. You can then wrap a{" "}
            <Cmp>CuriBase</Cmp> in <IJS>connect</IJS> to re-render your
            application when new responses are added to the store.
          </p>
          <PrismBlock lang="javascript">
            {`import { syncResponses, curiReducer } from '@curi/redux';
import { connect } from 'react-redux';
import { CuriBase } from '@curi/react-native';

const router = curi(history, routes);
const reducers = combineReducers({
  curi: curiReducer,
  ...
});
const store = createStore(reducers)
syncResponses(store, router);

const ConnectedBase = connect(
  ({ curi }) => ({
    router: curi.router,
    response: curi.response,
    navigation: curi.navigation
  })
)(CuriBase);`}
          </PrismBlock>
        </Subsection>
        <Subsection tag="h4" title="MobX" id="components-base-mobx">
          <p>
            The store provided by the{" "}
            <Link to="Package" params={{ package: "mobx" }}>
              <IJS>@curi/mobx</IJS>
            </Link>{" "}
            package combined with the <Cmp>Provider</Cmp>, <IJS>inject</IJS>,
            and <IJS>observer</IJS> from <IJS>mobx-react</IJS> can be used to
            sync Curi and MobX.
          </p>
          <PrismBlock lang="jsx">
            {`import { CuriStore } from '@curi/mobx';
import { CuriBase } from '@curi/react-native';
import { Provider, inject, observer } from 'mobx-react';

import router from './router';
import render from './render';

const curiStore = CuriStore(router);

const ConnectedBase = inject(({ curi }) => ({
  router: curi.router,
  response: curi.response,
  navigation: curi.navigation
}))(observer(CuriBase));

const App = () => (
  <Provider curi={curiStore}>
    <ConnectedBase render={render} />
  </Provider>
);`}
          </PrismBlock>
        </Subsection>
      </Subsection>
    </Section>
  </BaseGuide>
);
