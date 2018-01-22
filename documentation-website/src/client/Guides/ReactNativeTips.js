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
          themselves. That means that we have to make the <Cmp>CuriBase</Cmp>{" "}
          reactive. There are a couple of different approaches to accomplishing
          this.
        </p>
        <Subsection
          tag="h4"
          title={<Cmp>Curious</Cmp>}
          id="components-base-curious"
        >
          <p>
            The "vanilla" way to make <Cmp>CuriBase</Cmp> reactive is to wrap it
            in a <Cmp>Curious</Cmp> component and use that component's{" "}
            <IJS>render</IJS> function to render the <Cmp>CuriBase</Cmp>.
          </p>
          <PrismBlock lang="jsx">
            {`import { Curious, CuriBase } from '@curi/react-native';

import router from './router';
import render from './render';

const App = () => (
  <Curious
    router={router}
    render={props => <CuriBase {...props} render={render} />
  />
);`}
          </PrismBlock>
        </Subsection>
        <Subsection tag="h4" title="Redux" id="components-base-redux">
          <p>
            If you are using Redux in your application, you can use the{" "}
            <Link to="Package" params={{ package: "redux" }}>
              <IJS>@curi/redux</IJS>
            </Link>{" "}
            package to add Curi data to your store and just wrap{" "}
            <Cmp>CuriBase</Cmp> in <IJS>connect</IJS> to inject the relevant
            props.
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
            and <IJS>observer</IJS> from <IJS>mobx-react</IJS> makes
          </p>
          <PrismBlock lang="jsx">
            {`import { CuriStore } from '@curi/mobx';
import { CuriBase } from '@curi/react-native';
import { Provider, inject, observer } from 'mobx-react';

import router from './router';
import render from './render';

const curiStore = CuriStore(router);

const ResponsiveBase = inject(({ curi }) => ({
  router: curi.router,
  response: curi.response,
  navigation: curi.navigation
}))(observer(CuriBase));

const App = () => (
  <Provider curi={curiStore}>
    <ResponsiveBase render={render} />
  </Provider>
);`}
          </PrismBlock>
        </Subsection>
      </Subsection>
    </Section>
  </BaseGuide>
);
