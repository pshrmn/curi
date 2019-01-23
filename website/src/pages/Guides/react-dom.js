import React from "react";
import { Link } from "@curi/react-dom";

import {
  Section,
  Explanation,
  CodeBlock,
  Note,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "React DOM"
};

export default function ReactGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Rendering Responses" id="rendering">
        <Explanation>
          <p>
            The <IJS>curiProvider()</IJS> function is used to create the
            component at the root of a Curi + React application. You can call
            this component anything that you want, but here it will be referred
            to as the <Cmp>Router</Cmp>.
          </p>
          <Note>
            <p>
              Why does <IJS>@curi/react-dom</IJS> export a function to create a
              component and not just a component? Props signify values that can
              change, but an application should only ever have one router. By
              hard-coding the <IJS>router</IJS> into a component, we avoid
              having to handle the possibility of switching routers (which
              should not happen).
            </p>
          </Note>
          <p>
            <IJS>curiProvider()</IJS> is passed the application's Curi router.
            The returned component will automatically add an{" "}
            <Link name="Guide" params={{ slug: "navigating" }} hash="observer">
              observer
            </Link>{" "}
            to the Curi router when it mounts, so that it can re-render when
            there are new responses.
          </p>
          <p>
            The <Cmp>Router</Cmp> takes a render-invoked function as its{" "}
            <IJS>children</IJS> prop. This function will be called with an
            object that has three properties— <IJS>response</IJS>,{" "}
            <IJS>router</IJS>, and <IJS>navigation</IJS>—and returns the React
            element(s) that form the root of the application.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { curiProvider } from '@curi/react-dom';

import router from "./router";
const Router = curiProvider(router);

// router.once() is used to delay rendering in case
// the initially matched route is asynchronous
router.once(() => {
  ReactDOM.render((
    <Router>
      {({ response, router, navigation }) => {
        return <response.body />;
      }}
    </Router>
  ), document.getElementById("root"));
});`}
        </CodeBlock>

        <Section
          title="What to return from children()"
          id="children-return"
          tag="h3"
        >
          <Explanation>
            <p>
              The render-invoked <IJS>children()</IJS> is responsible for
              rendering the root elements for an application.
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
            {`ReactDOM.render((
  <Router>
    {({ response, router, navigation }) => {
      // rename body to Body for JSX transformation
      const { body:Body } = response;
      return (
        <React.Fragment>
          <header>
            <NavLinks />
          </header>
          <main>
            <Body response={response} />
          </main>
        </React.Fragment>
      );
    }}
  </Router>
), document.getElementById("root"));`}
          </CodeBlock>

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

ReactDOM.render((
  <Router>
    {({ response, router, navigation }) => {
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
    }}
  </Router>
), document.getElementById("root"));`}
          </CodeBlock>

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
                * anywhere that is a child of your <Cmp>Router</Cmp>.
              </p>
            </Note>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Curious } from "@curi/react-dom";
            
const BaseRouteName = ({ response }) => (
  <div>{response.name}</div>
);

export default function RouteName() {
  return (
    <Curious>
      {({ response }) => <BaseRouteName response={response} />}
    </Curious>
  );
}`}
          </CodeBlock>
        </Section>

        <Section title="Accessibility" id="accessibility" tag="h3">
          <Explanation>
            <p>
              Managing the application's focus when navigating is useful for
              users who use screen readers. The <Cmp>Focus</Cmp> component
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
          </Explanation>
          <CodeBlock lang="jsx" data-line="12-18">
            {`import { Focus } from "@curi/react-dom";
            
ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return (
        <React.Fragment>
          <header>
            <NavLinks />
          </header>
          <Focus>
            {ref => (
              <main ref={ref} tabIndex={-1}>
                <Body response={response} />
              </main>
            )}
          </Focus>
        </React.Fragment>
      );
    }}
  </Router>
), document.getElementById("root"));`}
          </CodeBlock>
        </Section>
      </Section>

      <Section title="Navigating" id="navigating">
        <Explanation>
          <p>
            The <Cmp>Link</Cmp> component is used to navigate between routes
            within an application. When it renders in the DOM, it will render as
            an anchor (<Cmp>a</Cmp>) element.
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

        <Explanation>
          <p>
            The <Cmp>Link</Cmp> also takes <IJS>hash</IJS>, <IJS>query</IJS>,
            and <IJS>state</IJS> props to attach their values to the location
            that will be navigated to.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`<Link name="Home" hash="details">Home</Link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </Section>

      <Explanation>
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
      </Explanation>
    </React.Fragment>
  );
}
