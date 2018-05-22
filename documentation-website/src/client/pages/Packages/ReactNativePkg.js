import React from "react";
import { Link } from "@curi/react";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note, Warning } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    unpkg={false}
    about={
      <div>
        <p>
          The <IJS>@curi/react-native</IJS> provides components to use Curi
          routing in a React Native application.
        </p>
        <p>
          For more information on using Curi with React Native, please check out
          the{" "}
          <Link to="Guide" params={{ slug: "react-native" }}>
            React Native guide
          </Link>.
        </p>
      </div>
    }
  >
    <APIBlock>
      <Section title={<Cmp>CuriProvider</Cmp>} id="CuriProvider">
        <SideBySide>
          <Explanation>
            <p>
              The <Cmp>CuriProvider</Cmp> is the root Curi component for an
              application. It has two jobs:
            </p>
            <ol>
              <li>
                Re-rendering the application when a new response is emitted.
              </li>
              <li>
                Placing values on the context so that the other Curi components
                can access them.
              </li>
            </ol>
            <Note>
              All of the other components provided by{" "}
              <IJS>@curi/react-native</IJS> must be descendants of a{" "}
              <Cmp>CuriProvider</Cmp>.
            </Note>
            <p>
              <Cmp>CuriProvider</Cmp> will observe your <IJS>router</IJS> so
              that it can automatically re-render your application after
              navigation.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { CuriProvider } from '@curi/react-native';
          
const App = () => (
  <CuriProvider router={router}>
    {({ response, navigation, router }) => {
      const { body:Body } = response;
      return <Body response={response} />;
    }}
  </CuriProvider>
);`}
          </CodeBlock>
        </SideBySide>
        <Section tag="h3" title="Props" id="CuriProvider-props">
          <Subsection tag="h4" title="router" id="CuriProvider-router">
            <SideBySide>
              <Explanation>
                <p>A Curi router.</p>
              </Explanation>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="children" id="CuriProvider-render">
            <SideBySide>
              <Explanation>
                <p>
                  <IJS>children</IJS> is a render-invoked prop. When it is
                  called, it will be passed an object with three properties:
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>property</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>response</td>
                      <td>
                        the response object generated for the current location
                      </td>
                    </tr>
                    <tr>
                      <td>navigation</td>
                      <td>
                        the <IJS>action</IJS> of the navigation and the{" "}
                        <IJS>previous</IJS> response object
                      </td>
                    </tr>
                    <tr>
                      <td>router</td>
                      <td>the Curi router</td>
                    </tr>
                  </tbody>
                </table>
              </Explanation>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Link</Cmp>} id="Link">
        <SideBySide>
          <Explanation>
            <p>
              A <Cmp>Link</Cmp> is used for navigating within your application.
              By default, this will render a <Cmp>TouchableHighlight</Cmp>, but
              you can also provide another component. When the rendered element
              is touched, it will use the router's <IJS>history</IJS> object to
              change locations, which will trigger a re-render.
            </p>

            <p>
              With the <Cmp>Link</Cmp>, instead of providing a URI to navigate
              to, you specify the name of the route that you want to link to.
              Then, the pathname of the URI you want the component to link to
              will be automatically generated for you.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Link } from '@curi/react-native';
          
<Link to='User' params={{ id: 16 }}>
  <Text>User 16</Text>
</Link>
// <TouchableHighlight>
//   <Text>User 16</Text>
// </TouchableHighlight>`}
          </CodeBlock>
        </SideBySide>

        <Section tag="h3" title="Props" id="Link-props">
          <Subsection tag="h4" title="to" id="Link-to">
            <SideBySide>
              <Explanation>
                <p>The name of the route that you want to navigate to.</p>
                <p>
                  If <IJS>to</IJS> is not provided, the <Cmp>Link</Cmp> will
                  re-use the current location's <IJS>pathname</IJS>. This is
                  useful for linking to hashes within the current page.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// Home route is { name: "Home", path: "" }
<Link to="Home">Home</Link>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="params" id="Link-params">
            <SideBySide>
              <Explanation>
                <p>
                  If the route that you want to navigate to (or any of its
                  parents) include path parameters, you can specify them using
                  the params prop.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// User route is { name: 'User', path: '/user/:id' }
<Link to='User' params={{ id: 16 }}>User 16</Link>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection
            tag="h4"
            title="hash, query &amp; state"
            id="Link-hash-query-state"
          >
            <SideBySide>
              <Explanation>
                <p>
                  While the pathname of the location to navigate to will be
                  generated for you, this does not cover over location
                  properties (query, hash, and state). The <IJS>query</IJS>,{" "}
                  <IJS>hash</IJS>, and <IJS>state</IJS> props are used to pass
                  these values.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`<Link
  to='Products'
  params={{ type: 'vacuums' }}
  hash="iroomba"
  query="volume=loud"
  state={{ owner: "Tom Haverford" }}
>
  DJ Roomba
</Link>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="children" id="Link-children">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>children</IJS> prop can take two forms: either a
                  valid React Node (e.g. a React element, a string, or{" "}
                  <IJS>null</IJS>) or a render-invoked <IJS>children</IJS>{" "}
                  function.
                </p>
                <p>
                  The render-invoked <IJS>children</IJS> function will be called
                  with the <Cmp>Link</Cmp>'s navigation state. The navigation
                  state is <IJS>false</IJS> to start, <IJS>true</IJS> when the{" "}
                  <Cmp>Link</Cmp> is clicked, and <IJS>false</IJS> when the the
                  navigation finishes/is cancelled.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// a React node
<Link to="Home">
  <Text>Home</Text>
</Link>

// a render-invoked function
<Link to="User" params={{ id: 1 }}>
  {navigating => (
    <React.Fragment>
      <Text>User 1</Text>
      {navigating ? <Spinner /> : null}
    </React.Fragment>
  )}
</Link>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="anchor" id="Link-anchor">
            <SideBySide>
              <Explanation>
                <p>
                  By default, when you render a <Cmp>Link</Cmp>, a{" "}
                  <Cmp>TouchableHighlight</Cmp> element will be rendered (<IJS>
                    React.createElement(TouchableHighlight, ...)
                  </IJS>). <IJS>anchor</IJS> lets you provide your own component
                  to be rendered instead.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`<Link
  to='User'
  params={{ id: 16 }}
  anchor={TouchableOpacity}
>
  <Text>User 16</Text>
</Link>
// <TouchableOpacity>
//   <Text>User 16</Text>
// </TouchableOpacity>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Curious</Cmp>} id="Curious">
        <SideBySide>
          <Explanation>
            <p>
              A context consumer component for injecting router values into
              components.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Curious } from '@curi/react-native';

const  MyComponent = () => (
  <Curious>
    {({ router, response, navigation }) => {
      // pass these props to any components that need them
      return (
        <ThingThatNeedsResponse response={response} />
      );
    }}
  </Curious>
);`}
          </CodeBlock>
        </SideBySide>

        <Section tag="h3" title="Props" id="curious-props">
          <Subsection tag="h4" title="children" id="curious-children">
            <SideBySide>
              <Explanation>
                <p>
                  A render-invoked function that returns a React element. This
                  function will receive an object with <IJS>router</IJS>,{" "}
                  <IJS>response</IJS> and <IJS>navigation</IJS> properties.
                </p>
              </Explanation>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Active</Cmp>} id="Active">
        <SideBySide>
          <Explanation>
            <p>
              The <Cmp>Active</Cmp> component is used to render based on whether
              or not a route is "active" (its name and params match the current
              response's name and params) using a render-invoked{" "}
              <IJS>children</IJS> prop.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Active } from '@curi/react';

const ActiveLink = ({ to, params, partial, ...rest}) => (
  <Active name={to} params={params} partial={partial}>
    {active => (
      <Link
        to={to}
        params={params}
        {...rest}
        className={active ? "active" : ""}
      />
    )}
  </Active>
);

<ActiveLink to="Home">Home</ActiveLink>`}
          </CodeBlock>
        </SideBySide>

        <Note>
          <SideBySide>
            <Explanation>
              <p>
                This relies on the active route interaction from{" "}
                <Link to="Package" params={{ package: "route-active" }}>
                  @curi/route-active
                </Link>{" "}
                being added to your router.
              </p>
            </Explanation>
            <CodeBlock>
              {`import active from '@curi/route-active';

const router = curi(history, routes, {
  route: [active()]
});`}
            </CodeBlock>
          </SideBySide>
        </Note>

        <Section tag="h3" title="Props" id="Active-props">
          <Subsection tag="h4" title="name" id="Active-name">
            <SideBySide>
              <Explanation>
                <p>
                  The name of the route to compare against the response object.
                </p>
              </Explanation>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="params" id="Active-params">
            <SideBySide>
              <Explanation>
                <p>
                  An object containing route parameters. These will be compared
                  against the route params of the response object.
                </p>
              </Explanation>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="children" id="Active-children">
            <SideBySide>
              <Explanation>
                <p>
                  A render-invoked function whose first argument is whether the
                  route (determined using the <IJS>name</IJS> and{" "}
                  <IJS>params</IJS>) is active.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// response = { name: "Photo", params: { id: "abcde" }}

<Active name="Photo" params={{ id: "abcde" }}>
  {active => ( // if active === true
    <Photo className={active ? "active" : "inactive"} />
  )}
</Active>
// <Photo className="active" />

<Active name="Photo" params={{ id: "qwerty" }}>
  {active => ( // if active === false
    <Photo className={active ? "active" : "inactive"} />
  )}
</Active>
// <Photo className="inactive" />`}
              </CodeBlock>
            </SideBySide>
            <SideBySide>
              <Explanation>
                <p>
                  The second argument passed to the render-invoked function is
                  the current <IJS>response</IJS>. <Cmp>Active</Cmp> only checks
                  if the route is active (i.e. matches the current location's{" "}
                  <IJS>pathname</IJS>). If you want to check if the{" "}
                  <IJS>query</IJS> or <IJS>hash</IJS>, you should do this
                  yourself inside of the render-invoked function. You can
                  compare the <IJS>query</IJS>/<IJS>hash</IJS> against the
                  response's <IJS>location</IJS>.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`<Active name="Home">
  {(active, response) => {
    const activeHash = response.hash === "ahoy"
    // ...
  }}
</Active>`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="partial" id="Active-partial">
            <SideBySide>
              <Explanation>
                <p>
                  When <IJS>true</IJS>, <IJS>partial</IJS> allows ancestor
                  routes to be considered active. Defaults to <IJS>false</IJS>.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// response = { name: "Photo", params: { id: "abcde" }}
// where "Photo" is a child route of "Album"

<Active name="Album">
  {active => ( // if active === false
    <Album className={active ? "active" : "inactive"} />
  )}
</Active>
// <Album className="inactive" />

<Active name="Album" partial={true}>
  {active => ( // if active === true
    <Album className={active ? "active" : "inactive"} />
  )}
</Active>
// <Album className="active" />`}
              </CodeBlock>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>

      <Section title={<Cmp>Block</Cmp>} id="Block">
        <SideBySide>
          <Explanation>
            <p>
              The <Cmp>Block</Cmp> component lets you prevent navigation until a
              user has confirmed that they want to navigate. This can be useful
              when the user attempts to navigate away from a partially filled
              form.
            </p>
          </Explanation>
          <CodeBlock>{`import { Block } from '@curi/react-native';`}</CodeBlock>
        </SideBySide>

        <Section tag="h3" title="Props" id="Block-props">
          <Subsection tag="h4" title="active" id="Block-active">
            <SideBySide>
              <Explanation>
                <p>
                  A boolean, which is <IJS>true</IJS> by default. When it is{" "}
                  <IJS>true</IJS>, the navigation will be blocked. When it is{" "}
                  <IJS>false</IJS>, navigation will not be blocked.
                </p>
              </Explanation>
              <CodeBlock lang="jsx">
                {`// will block navigation
<Block active={true} confirm={confirm} />

// will not block navigation
<Block active={false} confirm={confirm} />`}
              </CodeBlock>
            </SideBySide>
          </Subsection>

          <Subsection tag="h4" title="confirm" id="Block-confirm">
            <SideBySide>
              <Explanation>
                <p>
                  The confirm prop is a function that will be called whenever
                  there is navigation.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>argument</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>location</td>
                      <td>the location that is being navigated to</td>
                    </tr>
                    <tr>
                      <td>action</td>
                      <td>the type of navigation</td>
                    </tr>
                    <tr>
                      <td>success</td>
                      <td>a function to call when navigation should happen</td>
                    </tr>
                    <tr>
                      <td>failure</td>
                      <td>
                        a function to call when navigation should be cancelled.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Explanation>
              <CodeBlock lang="jsx">
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
              </CodeBlock>
            </SideBySide>
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
