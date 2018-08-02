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
    <Section title="Rendering Responses" id="rendering">
      <SideBySide>
        <Explanation>
          <p>
            The <Cmp>CuriProvider</Cmp> component is the root of a Curi + React
            application.
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
          {`import { CuriProvider } from '@curi/react';

import router from "./router";

// router.respond() is used to delay rendering in case
// the initially matched route is asynchronous
router.respond(() => {
  ReactDOM.render((
    <CuriProvider router={router}>
      {({ response, router, navigation }) => {
        return <response.body />;
      }}
    </CuriProvider>
  ), document.getElementById("root"));
});`}
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
  <CuriProvider router={router}>
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
  </CuriProvider>
), document.getElementById("root"));`}
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

ReactDOM.render((
  <CuriProvider router={router}>
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
  </CuriProvider>
), document.getElementById("root"));`}
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
            {`import { Curious } from "@curi/react";
            
const RouteName = ({ response }) => (
  <div>{response.name}</div>
);

export default () => (
  <Curious>
    {({ response }) => <RouteName response={response} />}
  </Curious>
);`}
          </CodeBlock>
        </SideBySide>
      </Subsection>

      <Subsection title="Accessibility" id="accessibility">
        <SideBySide>
          <Explanation>
            <p>
              Managing the application's focus when navigating is useful for
              users who use screen readers. The <Cmp>Focus</Cmp> component
              provides a convenient way to focus a page's main content when it
              renders a new response.
            </p>
            <p>
              You can read some more about accessilibity in the{" "}
              <Link to="Guide" params={{ slug: "accessibility" }}>
                accessibility
              </Link>{" "}
              guide.
            </p>
          </Explanation>
          <CodeBlock lang="jsx" data-line="12-18">
            {`import { Focus } from "@curi/react";
            
ReactDOM.render((
  <CuriProvider router={router}>
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
  </CuriProvider>
), document.getElementById("root"));`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Navigating" id="navigating">
      <SideBySide>
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
          {`import { Link } from "@curi/react";
          
const NavLinks = () => (
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="About">About</Link>
      </li>
      <li>
        <Link to="User" params={{ id: "blue" }}>Blue</Link>
      </li>
    </ul>
  </nav>
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
          {`<Link to="Home" hash="details">Home</Link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </SideBySide>
    </Section>
    <SideBySide>
      <Explanation>
        <p>
          Please check out the full{" "}
          <Link to="Package" params={{ package: "react" }} hash="API">
            <IJS>@curi/react</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </Explanation>
    </SideBySide>
  </BaseGuide>
);
