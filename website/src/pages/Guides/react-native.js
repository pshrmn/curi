import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "React Native"
};

let responseMeta = {
  title: "What to render",
  hash: "render-response"
};
let renderingMeta = {
  title: "Rendering Responses",
  hash: "rendering",
  children: [responseMeta]
};

let navigatingMeta = {
  title: "Navigating",
  hash: "navigating"
};

let backMeta = {
  title: "Back Button",
  hash: "back-button"
};
let tipsMeta = {
  title: "React Native Tips",
  hash: "tips",
  children: [backMeta]
};

let contents = [renderingMeta, navigatingMeta, tipsMeta];

function ReactNativeGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title} />

      <HashSection meta={renderingMeta} tag="h2">
        <Paragraph>
          The <IJS>createRouterComponent</IJS> function is used to create the
          component at the root of a Curi + React application. You can call this
          component anything that you want, but here it will be referred to as
          the <IJS>Router</IJS>.
        </Paragraph>
        <Note>
          <Paragraph>
            Why does <IJS>@curi/react-native</IJS> export a function to create a
            component and not a component? Props signify values that can change,
            but an application should only ever have one router. By hard-coding
            the <IJS>router</IJS> into a component, we avoid having to handle
            the possibility of switching routers (which should not happen).
          </Paragraph>
        </Note>

        <Paragraph>
          <IJS>createRouterComponent</IJS> is passed the application's Curi
          router to create a <IJS>Router</IJS> component. The <IJS>Router</IJS>{" "}
          will automatically add an{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v2" }}
            hash="observe"
          >
            observer
          </Link>{" "}
          to the Curi router when it mounts, so that it can re-render when there
          are new responses.
        </Paragraph>

        <Paragraph>
          Along with setting up an observer to react to new responses, the{" "}
          <IJS>Router</IJS> sets up contexts for routing values. The
          <IJS>response</IJS> and <IJS>navigation</IJS> can be read using the{" "}
          <Link
            name="Package"
            params={{ package: "react-native", version: "v2" }}
            hash="useResponse"
          >
            <IJS>useResponse</IJS> hook
          </Link>
          , while the <IJS>router</IJS> can be read using the{" "}
          <Link
            name="Package"
            params={{ package: "react-native", version: "v2" }}
            hash="useRouter"
          >
            <IJS>useRouter</IJS> hook
          </Link>
          .
        </Paragraph>

        <CodeBlock lang="jsx">
          {`import {
  createRouterComponent,
  useRouter,
  useResponse
} from '@curi/react-native';

import router from "./router";
let Router = createRouterComponent(router);

function App() {
  let router = userRouter();
  let {
    response,
    navigation
  } = useResponse();
  let { body:Body } = response;
  return <Body />
}

function MyReactNativeApp = () => (
  <Router>
    <App />
  </Router>
);`}
        </CodeBlock>

        <HashSection meta={responseMeta} tag="h3">
          <Paragraph>
            The <IJS>Router</IJS> component sets up the application's routing,
            while its children render the application's content. The Curi router
            generates <IJS>response</IJS> objects from matched locations; those
            are core for figuring out what to render.
          </Paragraph>

          <Paragraph>
            If you use <IJS>route.respond</IJS> to set React components as the{" "}
            <IJS>body</IJS> properties on your responses, you can create a React
            element for the <IJS>body</IJS> component.
          </Paragraph>

          <Paragraph>
            The <IJS>Body</IJS> element (it is useful to rename the{" "}
            <IJS>response</IJS>'s <IJS>body</IJS> to <IJS>Body</IJS> for JSX
            transformation) is a placeholder for the "real" component that you
            render for a route. This means that the "real" component will be
            different for every route.
          </Paragraph>

          <Paragraph>
            While not a strict requirement, it is useful to pass the{" "}
            <IJS>response</IJS> object as a prop to the rendered <IJS>Body</IJS>{" "}
            component.
          </Paragraph>

          <CodeBlock lang="jsx">
            {`function App() {
  let { response } = useResponse();
  let { body:Body } = response;
  return <Body response={response} />
}

function MyReactNativeApp() {
  return (
    <Router>
      <NavLinks />
      <App />
    </Router>
  )
}`}
          </CodeBlock>

          <Paragraph>
            If your routes use an object to attach multiple components to a
            response, the <IJS>children</IJS> function also provides a good
            place to split these apart.
          </Paragraph>

          <Note>
            <Paragraph>
              If you do take this approach, please remember that you want every
              route to set the same <IJS>body</IJS> shape. Otherwise, you'll
              have to determine the shape and change how you render in the{" "}
              <IJS>children</IJS> function, which can quickly become messy.
            </Paragraph>
          </Note>

          <CodeBlock lang="jsx" data-line="22,26,29">
            {`let routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: {
          Main: HomeMain,
          Menu: HomeMenu
        }
      }
    }
  },
  // ...
]);

function App() {
  let { response } = useResponse();
  let { Main, Menu } = response.body;
  return (
    <React.Fragment>
      <Menu />
      <Main response={response} />
    </React.Fragment>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={navigatingMeta} tag="h2">
        <Paragraph>
          The <IJS>Link</IJS> component is used to navigate between routes
          within an application. By default, the <IJS>Link</IJS> will render as
          a <IJS>TouchableHighlight</IJS>, but you can specify a different
          component using the <IJS>anchor</IJS> prop.
        </Paragraph>
        <Paragraph>
          The <IJS>Link</IJS>'s <IJS>name</IJS> prop describes which route
          clicking the link should navigate to. If you pass an invalid route
          name, Curi will warn you.
        </Paragraph>
        <Paragraph>
          If a route has any params (or if any of a route's ancestors have
          params for nested routes), the <IJS>params</IJS> prop is used to pass
          these to the <IJS>Link</IJS>.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`import { Link } from "@curi/react-native";

let NavLinks = () => (
  <View>
    <Link name="Home">
      <Text>Home</Text>
    </Link>
    <Link name="About" anchor={TouchableOpacity}>
      <Text>About</Text>
    </Link>
    <Link name="User" params={{ id: "blue" }}>
      <Text>Blue</Text>
    </Link>
  </View>
);`}
        </CodeBlock>

        <Paragraph>
          The <IJS>Link</IJS> also takes <IJS>hash</IJS>, <IJS>query</IJS>, and{" "}
          <IJS>state</IJS> props to attach their values to the location that
          will be navigated to.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`<Link name="Home" hash="details">
  <Text>Home</Text>
</Link>`}
        </CodeBlock>
      </HashSection>

      <Paragraph>
        Please check out the full{" "}
        <Link
          name="Package"
          params={{ package: "react-dom", version: "v2" }}
          hash="API"
        >
          <IJS>@curi/react-dom</IJS>
        </Link>{" "}
        API documentation to see every component that the package provides.
      </Paragraph>

      <HashSection meta={tipsMeta} tag="h2">
        <Note>
          <Paragraph>
            This guide assumes that you are already familiar with React Native.
          </Paragraph>
        </Note>

        <HashSection meta={backMeta} tag="h3">
          <Paragraph>
            To add back button support, you need to use your <IJS>history</IJS>{" "}
            object (which you can access through your router as{" "}
            <IJS>router.history</IJS>).
          </Paragraph>
          <Paragraph>
            The <IJS>history.go</IJS> method is used for jumping between
            locations, so passing it <IJS>-1</IJS> will jump back to the
            previous location.
          </Paragraph>
          <Paragraph>
            When the app is at the initial location, you may want to return{" "}
            <IJS>false</IJS> to close the app when the user presses the back
            button.
          </Paragraph>

          <CodeBlock>
            {`import { BackHandler } from 'react-native';

// create your router
let router = createRouter(browser, routes);

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
        </HashSection>
      </HashSection>
    </React.Fragment>
  );
}

export { ReactNativeGuide as component, contents };
