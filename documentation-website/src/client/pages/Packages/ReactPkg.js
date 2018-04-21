import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note, Warning } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <div>
        <p>
          The <IJS>@curi/react</IJS> provides a number of React components that
          you can use for rendering your application.
        </p>
      </div>
    }
  >
    <APIBlock>
      <Section title={<Cmp>CuriProvider</Cmp>} id="CuriProvider">
        <PrismBlock lang="javascript">
          {`import { CuriProvider } from '@curi/react';`}
        </PrismBlock>
        <p>
          The <Cmp>CuriProvider</Cmp> is the root Curi component for an
          application. It has two jobs:
        </p>
        <ol>
          <li>Re-rendering the application when a new response is emitted.</li>
          <li>
            Placing values on the context so that the other Curi components can
            access them.
          </li>
        </ol>
        <Note>
          All of the other components provided by <IJS>@curi/react</IJS> must be
          descendants of a <Cmp>CuriProvider</Cmp>.
        </Note>
        <p>
          This component will listen for new responses to be emitted by your{" "}
          <IJS>router</IJS> and will automatically re-render your application
          when this happens.
        </p>

        <PrismBlock lang="jsx">
          {`const App = () => (
  <CuriProvider router={router}>
    {({ response, navigation, router }) => {
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </CuriProvider>
);`}
        </PrismBlock>
        <Section tag="h3" title="Props" id="CuriProvider-props">
          <Subsection tag="h4" title="router" id="CuriProvider-router">
            <p>A Curi router.</p>
          </Subsection>

          <Subsection tag="h4" title="children" id="CuriProvider-render">
            <p>
              <IJS>children</IJS> is a render-invoked prop that will be passed
              an object with three properties:
            </p>
            <ol>
              <li>
                <IJS>response</IJS> is the response object generated for the
                current location.
              </li>
              <li>
                <IJS>navigation</IJS> is additional information about the last
                navigation that doesn't make sense to place in the response.
              </li>
              <li>
                <IJS>router</IJS> is the Curi router.
              </li>
            </ol>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Link</Cmp>} id="Link">
        <PrismBlock lang="javascript">
          {`import { Link } from '@curi/react';`}
        </PrismBlock>
        <p>
          A <Cmp>Link</Cmp> allows you to navigate within your application using
          an anchor element (<Cmp>a</Cmp>). When the rendered element is
          clicked, instead of reloading the page it will use your router
          object's history object to navigate.
        </p>

        <p>
          With the <Cmp>Link</Cmp>, instead of providing a URI to navigate to,
          you just need to specify the name of the route you want to link to.
          Then, the pathname of the URI you want the component to link to will
          be automatically generated for you.
        </p>

        <PrismBlock lang="jsx">
          {`<Link to='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>`}
        </PrismBlock>

        <Section tag="h3" title="Props" id="Link-props">
          <Subsection tag="h4" title="to" id="Link-to">
            <p>The name of the route that you want to navigate to.</p>
            <PrismBlock lang="jsx">
              {`// Home route is { name: "Home", path: "" }
<Link to="Home">Home</Link>`}
            </PrismBlock>
            <p>
              If <IJS>to</IJS> is not provided, the <Cmp>Link</Cmp> will re-use
              the current location's <IJS>pathname</IJS>. This is useful for
              linking to hashes within the current page.
            </p>
          </Subsection>

          <Subsection tag="h4" title="params" id="Link-params">
            <p>
              If the route that you want to navigate to (or any of its parents)
              include path parameters, you can specify them using the params
              prop.
            </p>
            <PrismBlock lang="jsx">
              {`// User route is { name: 'User', path: '/user/:id' }
<Link to='User' params={{ id: 16 }}>User 16</Link>`}
            </PrismBlock>
          </Subsection>

          <Subsection
            tag="h4"
            title="hash, query &amp; state"
            id="Link-hash-query-state"
          >
            <p>
              While the pathname of the location to navigate to will be
              generated for you, this does not cover over location properties
              (query, hash, and state). The <IJS>query</IJS>, <IJS>hash</IJS>,
              and <IJS>state</IJS> props are used to pass these values.
            </p>
            <PrismBlock lang="jsx">
              {`<Link
  to='Products'
  params={{ type: 'vacuums' }}
  hash="iroomba"
  query="volume=loud"
  state={{ owner: "Tom Haverford" }}
>
  DJ Roomba
</Link>
// <a href="products/vacuums?volume=loud#iroomba">DJ Roomba</a>`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h4" title="anchor" id="Link-anchor">
            <p>
              By default, when you render a <Cmp>Link</Cmp>, an anchor element
              will be rendered (<IJS>React.createElement('a', ...)</IJS>).
              However, you can provide your own component to be rendered
              instead. This can be useful for using styled components to
              navigate.
            </p>
            <Warning>
              You can provide any component that you want, but you{" "}
              <em>should</em> stick with an anchor (or a component that renders
              an anchor). There are accessibility issues that will occur when
              you use other DOM elements as links. The component's prop type is
              func in an attempt to discourage you from making your link render
              a button, div, span, etc.
            </Warning>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Curious</Cmp>} id="Curious">
        <PrismBlock lang="javascript">
          {`import { Curious } from '@curi/react';`}
        </PrismBlock>
        <p>
          A context consumer component for injecting router values into
          components.
        </p>

        <PrismBlock lang="jsx">
          {`class MyComponent extends React.Component {
  render() {
    return (
      <Curious>
        {({ router, response, navigation }) => {
          // pass these props to any components that need them
          return (
            <ThingThatNeedsResponse response={response} />
          );
        }}
      </Curious>
    )
  }
}

export default MyComponent;`}
        </PrismBlock>

        <Section tag="h3" title="Props" id="curious-props">
          <Subsection tag="h4" title="children" id="curious-children">
            A render-invoked function that returns a React element. This
            function will receive an object with <IJS>router</IJS>,{" "}
            <IJS>response</IJS> and <IJS>navigation</IJS> properties.
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Active</Cmp>} id="Active">
        <PrismBlock lang="javascript">
          {`import { Active } from '@curi/react';`}
        </PrismBlock>
        <p>
          The <Cmp>Active</Cmp> component allows you to render based on whether
          or not a route is "active" (its name and params match the current
          response's name and params) using a render-invoked <IJS>children</IJS>{" "}
          prop.
        </p>

        <Note>
          <p>
            This relies on the active route interaction from{" "}
            <Link to="Package" params={{ package: "route-active" }}>
              @curi/route-active
            </Link>{" "}
            being added to your router.
          </p>

          <PrismBlock lang="javascript">
            {`import active from '@curi/route-active';

const router = curi(history, routes, {
  route: [active()]
});`}
          </PrismBlock>
        </Note>

        <Section tag="h3" title="Props" id="Active-props">
          <Subsection tag="h4" title="name" id="Active-name">
            <p>The name of the route to compare against the response object.</p>
          </Subsection>

          <Subsection tag="h4" title="params" id="Active-params">
            <p>
              An object containing route parameters. These will be compared
              against the route params of the response object.
            </p>
          </Subsection>

          <Subsection tag="h4" title="children" id="Active-children">
            <p>
              A render-invoked function whose first argument is whether the
              route (determined using the <IJS>name</IJS> and <IJS>params</IJS>)
              is active.
            </p>
            <PrismBlock lang="jsx">
              {`// response = { name: "Photo", params: { id: "abcde" }}

<Active name="Photo" params={{ id: "abcde" }}>
  {active => {
    // active === true
    return <Photo className={active ? "active" : "inactive"} />
  }}
</Active>
// <Photo className="active" />

<Active name="Photo" params={{ id: "qwerty" }}>
  {active => {
    // active === false
    return <Photo className={active ? "active" : "inactive"} />
  }}
</Active>
// <Photo className="inactive" />`}
            </PrismBlock>
            <p>
              The second argument passed to the render-invoked function is the
              current <IJS>response</IJS>. <Cmp>Active</Cmp> only checks if the
              route is active (i.e. matches the current location's{" "}
              <IJS>pathname</IJS>). If you want to check if the <IJS>query</IJS>{" "}
              or <IJS>hash</IJS>, you should do this yourself inside of the
              render-invoked function. You can compare the <IJS>query</IJS>/<IJS
              >
                hash
              </IJS>{" "}
              against the response's <IJS>location</IJS>.
            </p>
            <PrismBlock lang="jsx">
              {`<Active name="Home">
  {(active, response) => {
    const activeHash = response.hash === "ahoy"
    // ...
  }}
</Active>`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h4" title="partial" id="Active-partial">
            <p>
              When <IJS>true</IJS>, <IJS>partial</IJS> allows ancestor routes to
              be "active". Defaults to <IJS>false</IJS>.
            </p>
            <PrismBlock lang="jsx">
              {`// response = { name: "Photo", params: { id: "abcde" }}
// where "Photo" is a child route of "Album"

<Active name="Album">
  {active => {
    // active === false
    return <Album className={active ? "active" : "inactive"} />
  }}
</Active>
// <Album className="inactive" />

<Active name="Album" partial={true}>
  {active => {
    // active === true
    return <Album className={active ? "active" : "inactive"} />
  }}
</Active>
// <Album className="active" />`}
            </PrismBlock>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Block</Cmp>} id="Block">
        <PrismBlock lang="javascript">
          {`import { Block } from '@curi/react';`}
        </PrismBlock>
        <p>
          The <Cmp>Block</Cmp> component lets you prevent navigation until a
          user has confirmed that they want to navigate. This can be useful when
          the user attempts to navigate away from a partially filled form. This{" "}
          <strong>will not</strong> prevent the user from navigating to another
          site, it only works for navigation within the application.
        </p>

        <Section tag="h3" title="Props" id="Block-props">
          <Subsection tag="h4" title="active" id="Block-active">
            <p>
              A boolean, which is true by default. When it is true, the
              navigation block is active. When it is false, navigation will not
              be blocked.
            </p>
            <PrismBlock lang="jsx">
              {`// will block navigation
<Block active={true} confirm={confirm} />

// will not block navigation
<Block active={false} confirm={confirm} />`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h4" title="confirm" id="Block-confirm">
            <p>
              The confirm prop is a function that will be called whenever there
              is navigation. The function will receive four arguments: location,
              action, success, and failure. The location and action values are
              the location object that is being navigated to and the type of
              navigation. The success and failure arguments are functions that
              you should call depending on whether or not you want to let the
              navigation happen. When the navigation should occur, the confirm
              function should call the success function. When the navigation
              should be cancelled, the failure function should be called.
            </p>
            <PrismBlock lang="jsx">
              {`<Block
  confirm={({ location, action }, success, failure) => {
    const response = window.confirm("Shall we?");
    if (response) {
      success();
    } else {
      failure();
    }
  }}
/>`}
            </PrismBlock>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
