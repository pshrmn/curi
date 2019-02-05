import React from "react";
import { Link } from "@curi/react-dom";

import {
  PlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "React DOM"
};

const responseMeta = {
  title: "What to render",
  hash: "render-response"
};
const a11yMeta = {
  title: "Accessibility",
  hash: "accessibility"
};
const renderingMeta = {
  title: "Rendering Responses",
  hash: "rendering",
  children: [responseMeta, a11yMeta]
};

const navigatingMeta = {
  title: "Navigating",
  hash: "navigating"
};

const contents = [renderingMeta, navigatingMeta];

function ReactDOMGuide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>
      </PlainSection>

      <HashSection meta={renderingMeta}>
        <p>
          The <IJS>curiProvider()</IJS> function is used to create the component
          at the root of a Curi + React application. You can call this component
          anything that you want, but here it will be referred to as the{" "}
          <IJS>Router</IJS>.
        </p>

        <Note>
          <p>
            Why does <IJS>@curi/react-dom</IJS> export a function to create a
            component and not just a component? Props signify values that can
            change, but an application should only ever have one router. By
            hard-coding the <IJS>router</IJS> into a component, we avoid having
            to handle the possibility of switching routers (which should not
            happen).
          </p>
        </Note>

        <p>
          <IJS>curiProvider()</IJS> is passed the application's Curi router to
          create a <IJS>Router</IJS> component. The <IJS>Router</IJS> will
          automatically add an{" "}
          <Link
            name="Package"
            params={{ package: "router", version: "v1" }}
            hash="observe"
          >
            observer
          </Link>{" "}
          to the Curi router when it mounts, so that it can re-render when there
          are new responses.
        </p>

        <p>
          Along with setting up an observer to react to new responses, the{" "}
          <IJS>Router</IJS> sets up a context for routing values. These values—
          <IJS>response</IJS>, <IJS>router</IJS>, and <IJS>navigation</IJS>—can
          be read using the{" "}
          <Link name="Package" params={{ package: "react-dom", version: "v2" }}>
            <IJS>useCuri</IJS> hook
          </Link>
          .
        </p>

        <CodeBlock lang="jsx">
          {`import { curiProvider, useCuri } from '@curi/react-dom';

import router from "./router";
const Router = curiProvider(router);

function App() {
  const {
    response,
    navigation,
    router
  } = useCuri();
  const { body:Body } = response;
  return <Body />
}

// router.once() is used to delay rendering in case
// the initially matched route is asynchronous
router.once(() => {
  ReactDOM.render((
    <Router>
      <App />
    </Router>
  ), document.getElementById("root"));
});`}
        </CodeBlock>

        <HashSection meta={responseMeta} tag="h3">
          <p>
            The <IJS>Router</IJS> component sets up the application's routing,
            while its children render the application's content. The Curi router
            generates <IJS>response</IJS> objects from matched locations; those
            are core for figuring out what to render.
          </p>

          <p>
            If you use <IJS>route.response</IJS> to set React components as the{" "}
            <IJS>body</IJS> properties on your responses, you can create a React
            element for the <IJS>body</IJS> component.
          </p>

          <p>
            The <IJS>Body</IJS> element (it is useful to rename the{" "}
            <IJS>response</IJS>'s <IJS>body</IJS> to <IJS>Body</IJS> for JSX
            transformation) is a placeholder for the "real" component that you
            render for a route. This means that the "real" component will be
            different for every route.
          </p>

          <p>
            While not a strict requirement, it is useful to pass the{" "}
            <IJS>response</IJS> object as a prop to the rendered <IJS>Body</IJS>{" "}
            component.
          </p>

          <CodeBlock lang="jsx">
            {`function App() {
  const { response } = useCuri();
  const { body:Body } = response;
  return <Body response={response} />              
}

ReactDOM.render((
  <Router>
    <header>
      <NavLinks />
    </header>
    <main>
      <App />
    </main>
  </Router>
), document.getElementById("root"));`}
          </CodeBlock>

          <p>
            If your routes use an object to attach multiple components to a
            response, the <IJS>children()</IJS> function also provides a good
            place to split these apart.
          </p>

          <Note>
            <p>
              If you do take this approach, please remember that you want every
              route to set the same <IJS>body</IJS> shape. Otherwise, you'll
              have to determine the shape and change how you render in the{" "}
              <IJS>children()</IJS> function, which can quickly become messy.
            </p>
          </Note>

          <CodeBlock lang="jsx" data-line="20,24,27">
            {`const routes = prepareRoutes([
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
]);

function App() {
  const { response } = useCuri();
  const { Main, Menu } = response.body;
  return (
    <React.Fragment>
      <header>
        <Menu />
      </header>
      <main>
        <Main response={response} />
      </main>
    </React.Fragment>
  );
}`}
          </CodeBlock>
        </HashSection>

        <HashSection meta={a11yMeta} tag="h3">
          <p>
            Managing the application's focus when navigating is useful for users
            who use screen readers. The{" "}
            <Link
              name="Package"
              params={{ package: "react-dom", version: "v2" }}
              hash="useNavigationFocus"
            >
              <IJS>useNavigationFocus</IJS> hook
            </Link>
            provides a convenient way to focus a page's main content when it
            renders a new response.
          </p>
          <p>
            You can read some more about accessibility in the{" "}
            <Link name="Guide" params={{ slug: "accessibility" }}>
              accessibility
            </Link>{" "}
            guide.
          </p>

          <CodeBlock lang="jsx" data-line="5-6,14">
            {`import { useCuri, useNavigationFocus } from "@curi/react-dom";
            
function App()
  const { response } = useCuri();
  const ref = React.createRef(null);
  useNavigationFocus(ref);

  const { body:Body } = response;
  return (
    <React.Fragment>
      <header>
        <NavLinks />
      </header>
      <main ref={ref} tabIndex={-1}>
        <Body response={response} />
      </main>
    </React.Fragment>
  );
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={navigatingMeta}>
        <p>
          The <IJS>Link</IJS> component is used to navigate between routes
          within an application. When it renders in the DOM, it will render as
          an anchor (<Cmp>a</Cmp>) element.
        </p>
        <p>
          The <IJS>Link</IJS>'s <IJS>to</IJS> prop describes which route
          clicking the link should navigate to. If you pass an invalid route
          name, Curi will warn you.
        </p>
        <p>
          If a route has any params (or if any of a route's ancestors have
          params for nested routes), the <IJS>params</IJS> prop is used to pass
          these to the <IJS>Link</IJS>.
        </p>

        <CodeBlock lang="jsx">
          {`import { Link } from "@curi/react-dom";
          
const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link name="Home">Home</Link>
      </li>
      <li>
        <Link name="About">About</Link>
      </li>
      <li>
        <Link name="User" params={{ id: "red" }}>Red</Link>
      </li>
    </ul>
  </nav>
);`}
        </CodeBlock>

        <p>
          The <IJS>Link</IJS> also takes <IJS>hash</IJS>, <IJS>query</IJS>, and{" "}
          <IJS>state</IJS> props to attach their values to the location that
          will be navigated to.
        </p>

        <CodeBlock lang="jsx">
          {`<Link name="Home" hash="details">Home</Link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </HashSection>

      <PlainSection>
        <p>
          Please check out the full{" "}
          <Link
            name="Package"
            params={{ package: "react-dom", version: "v1" }}
            hash="API"
          >
            <IJS>@curi/react-dom</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </PlainSection>
    </React.Fragment>
  );
}

export { ReactDOMGuide as component, contents };
