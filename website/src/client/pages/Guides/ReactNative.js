import React from "react";
import { Link } from "@curi/react-dom";

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
    <Section title="Rendering Responses" id="rendering">
      <SideBySide>
        <Explanation>
          <p>
            The <Cmp>CuriProvider</Cmp> component is the root of a Curi + React
            Native application.
          </p>
          <p>
            The <Cmp>CuriProvider</Cmp> is passed a Curi router through its{" "}
            <IJS>router</IJS> prop. The component will automatically add an{" "}
            <Link to="Guide" params={{ slug: "navigating" }} hash="observer">
              observer
            </Link>{" "}
            to the Curi router so that it can re-render when there are new
            responses.
          </p>
          <p>
            The <Cmp>CuriProvider</Cmp> also takes a render-invoked function as
            its <IJS>children</IJS> prop. This function will be called with an
            object that has three properties— <IJS>response</IJS>,{" "}
            <IJS>router</IJS>, and <IJS>navigation</IJS>—and returns the React
            element(s) that form the root of the application.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { CuriProvider } from '@curi/react-native';

import router from "./router";

const App = () => (
  <CuriProvider router={router}>
    {({ response, router, navigation }) => {
      return <response.body />;
    }}
  </CuriProvider>
);`}
        </CodeBlock>
      </SideBySide>

      <Subsection title="What to return from children()" id="children-return">
        <SideBySide>
          <Explanation>
            <p>
              The render-invoked <IJS>children()</IJS> is responsible for
              rendering the root elements for an application.
            </p>
            <p>
              Unlike with the DOM, React Native cannot have its initial render
              delayed with a <IJS>router.respond()</IJS> call. Instead, the{" "}
              <IJS>children()</IJS> function should check if the{" "}
              <IJS>response</IJS> exists, and rendering a loading component when
              it does not.
            </p>
            <p>
              If you set React components as the <IJS>body</IJS> properties on
              your responses, you can create a React element for the{" "}
              <IJS>body</IJS> component in this function.
            </p>
            <p>
              The <Cmp>Body</Cmp> element (it is useful to rename the{" "}
              <IJS>response</IJS>'s <IJS>body</IJS> to <IJS>Body</IJS> for JSX
              transformation) is a placeholder for the "real" component that you
              render for a route. This means that the "real" component will be
              different for every route. When it comes to passing props to the{" "}
              <Cmp>Body</Cmp>, you <em>could</em> use <IJS>response.name</IJS>{" "}
              to determine what props to pass based on which route matched, but
              passing the same props to every route's <Cmp>Body</Cmp> is usually
              sufficient. Passing the entire <IJS>response</IJS> is generally
              useful so that the route components can access any{" "}
              <IJS>params</IJS>, <IJS>data</IJS>, and other properties of the{" "}
              <IJS>response</IJS>.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`const App = () => (
  <CuriProvider router={router}>
    {({ response, router, navigation }) => {
      // async route protection
      if (!response) {
        return <Loading />;
      }

      // rename body to Body for JSX transformation
      const { body:Body } = response;
      return (
        <React.Fragment>
          <NavLinks />
          <Body response={response} />
        </React.Fragment>
      );
    }}
  </CuriProvider>
);`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              If your routes use an object to attach multiple components to a
              response, the <IJS>children()</IJS> function also provides a good
              place to split these apart.
            </p>
            <p>
              If you do take this approach, please remember that you want every
              route to set the same <IJS>body</IJS> shape. Otherwise, you'll
              have to determine the shape and change how you render in the{" "}
              <IJS>children()</IJS> function, which can quickly become messy.
            </p>
          </Explanation>
          <CodeBlock lang="jsx" data-line="20,24,27">
            {`const routes = [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: {
          Main: HomeMain,
          Menu: HomeMenu
        }
      }
    }
  },
  // ...
];

const App = () => (
  <CuriProvider router={router}>
    {({ response, router, navigation }) => {
      const { Main, Menu } = response.body;
      return (
        <React.Fragment>
          <Menu />
          <Main response={response} />
        </React.Fragment>
      );
    }}
  </CuriProvider>
);`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <Note>
              <p>
                There is a <Cmp>Curious</Cmp> component that you can render to
                access the <IJS>response</IJS>, <IJS>router</IJS>, and{" "}
                <IJS>navigation</IJS> objects anywhere* in your application.
                This can help prevent having to pass props through multiple
                layers of components.
              </p>
              <p>
                * anywhere that is a child of your <Cmp>CuriProvider</Cmp>.
              </p>
            </Note>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Curious } from "@curi/react-native";
            
const RouteName = ({ response }) => (
  <Text>{response.name}</Text>
);

export default () => (
  <Curious>
    {({ response }) => <RouteName response={response} />}
  </Curious>
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Navigating" id="navigating">
      <SideBySide>
        <Explanation>
          <p>
            The <Cmp>Link</Cmp> component is used to navigate between routes
            within an application. By default, the <Cmp>Link</Cmp> will render
            as a <Cmp>TouchableHighlight</Cmp>, but you can specify a different
            component using the <IJS>anchor</IJS> prop.
          </p>
          <p>
            The <Cmp>Link</Cmp>'s <IJS>to</IJS> prop describes which route
            clicking the link should navigate to. If you pass an invalid route
            name, Curi will warn you.
          </p>
          <p>
            If a route has any params (or if any of a route's ancestors have
            params for nested routes), the <IJS>params</IJS> prop is used to
            pass these to the <Cmp>Link</Cmp>.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { Link } from "@curi/react-native";
          
const NavLinks = () => (
  <View>
    <Link to="Home">
      <Text>Home</Text>
    </Link>
    <Link to="About" anchor={TouchableOpacity}>
      <Text>About</Text>
    </Link>
    <Link to="User" params={{ id: "blue" }}>
      <Text>Blue</Text>
    </Link>
  </View>
);`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
        <Explanation>
          <p>
            The <Cmp>Link</Cmp> also takes <IJS>hash</IJS>, <IJS>query</IJS>,
            and <IJS>state</IJS> props to attach their values to the location
            that will be navigated to.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`<Link to="Home" hash="details">
  <Text>Home</Text>
</Link>`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <SideBySide>
      <Explanation>
        <p>
          Please check out the full{" "}
          <Link to="Package" params={{ package: "react" }} hash="API">
            <IJS>@curi/react-dom</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </Explanation>
    </SideBySide>
    <Section title="React Native Tips" id="tips">
      <SideBySide>
        <Explanation>
          <Note>
            This guide assumes that you are already familiar with React Native.
          </Note>
        </Explanation>
      </SideBySide>
      <Subsection title="Back Button" id="back-button">
        <SideBySide>
          <Explanation>
            <p>
              To add back button support, you need to use your{" "}
              <IJS>history</IJS> object (which you can use directly or access
              through your router).
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
      </Subsection>
    </Section>
  </BaseGuide>
);
