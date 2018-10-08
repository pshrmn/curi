import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "React Router v4"
};

export default function MigrateReactRouterv4Guide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          React Router v4 isn't like most other routers because it lacks a
          centralized configuration. Migrating to Curi mostly involves
          re-centralizing your routes to simplify route management.
        </p>
      </Explanation>

      <Section title="Routes" id="routes">
        <p>Let’s get started with setting up our routes.</p>
        <Subsection title="With React Router" id="routes-with-react-router">
          <Explanation>
            <p>
              With React Router v4, <Cmp>Route</Cmp>s are defined in components.
              They are usually grouped together under a <Cmp>Switch</Cmp> so
              that only a single route from a group renders. Nested routes are
              rendered inside of the compnent rendered by the parent{" "}
              <Cmp>Route</Cmp>
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { Route, Switch } from "react-router-dom";
            
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/inbox" component={Inbox} />
  </Switch>                 
);

// the <Inbox> matches nested routes (and includes
// a <Route> for "exact" /inbox matches)
const Inbox = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.path}
      component={Messages}
    />
    <Route
      exact
      path={\`\${match.path}/:message\`}
      component={Message}
    />
  </Switch>
);`}
          </CodeBlock>
        </Subsection>
        <Subsection title="With Curi" id="routes-with-curi">
          <Explanation>
            <p>
              Routes in Curi are JavaScript objects. They are grouped together
              in an array of "top-level" routes. Nested routes are grouped under
              their parent route's <IJS>children</IJS> property.
            </p>

            <p>First, we will define the names and paths for our routes.</p>
            <p>
              Each route must have a unique name. A route's name will be used
              for interacting with it. For example, to navigate to a route, you
              only have to know its name, not its URL.
            </p>
            <p>
              The biggest difference between the Curi paths and the React Router
              paths is that with Curi, you never include a forward slash at the
              beginning of the path. This means that while the root path for
              React Router is <IJS>'/'</IJS>, the root path for Curi is{" "}
              <IJS>''</IJS>.
            </p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  {
    name: 'Home',
    path: ''
  },
  {
    name: 'Inbox',
    path: 'inbox',
    children: [
      {
        name: 'Message',
        path: ':message'
      }
    ]
  }
];`}
          </CodeBlock>

          <Explanation>
            <p>Next, we should add our components to each route.</p>
            <p>
              Curi routes can have a <IJS>response()</IJS> property, which is a
              function that returns an object of properties to merge onto the
              response that we will be using to render. For this React
              application, we want a response's <IJS>body</IJS> property to be
              the React component associated with each route.
            </p>
          </Explanation>
          <CodeBlock>
            {`import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Mesage from './pages/Message';

const routes = [
  {
    name: 'Home',
    path: '',
    response: () => {
      return {
        body: Home
      };
    }
  },
  {
    name: 'Inbox',
    path: 'inbox',
    response: () => {
      return {
        body: Inbox
      };
    },
    children: [
      {
        name: 'Message',
        path: ':message',
        response: () => {
          return {
            body: Message
          };
        }
      }
    ]
  }
];`}
          </CodeBlock>

          <Explanation>
            <p>
              With React Router v4, a component's lifecycle methods are used for
              loading data, code splitting, and other non-rendering tasks. With
              Curi, routes can have functions that are called when they match
              the new location. These are grouped under the route's{" "}
              <IJS>resolve</IJS> object. The <IJS>resolve</IJS> functions are
              called every time that a route matches a location.
            </p>
            <p>
              The{" "}
              <Link
                to="Package"
                params={{ package: "router" }}
                hash="route-properties"
              >
                <IJS>@curi/router</IJS> route API documentation
              </Link>{" "}
              covers all of the route properties.
            </p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  {
    path: '',
    response: () => {
      return {
        body: Home
      };
    }
  },
  {
    path: 'inbox',
    response: () => {
      return {
        body: Inbox
      };
    },
    children: [
      {
        path: ':message',
        response: () => {
          return {
            body: Message
          };
        },
        resolve: {
          body: (route) => { return ... },
        }
      }
    ]
  }
];`}
          </CodeBlock>
        </Subsection>
        <p>
          Once your routes have been defined, you can move on to creating your
          Curi router.
        </p>
      </Section>

      <Section title="Creating the router" id="creating-the-router">
        <Explanation>
          <p>
            With React Router, you create your router by rendering a{" "}
            <Cmp>Router</Cmp> component. This may be a <Cmp>BrowserRouter</Cmp>,
            a <Cmp>HashRouter</Cmp>, a <Cmp>MemoryRouter</Cmp>, or a plain{" "}
            <Cmp>Router</Cmp> that you pass your own <IJS>history</IJS> instance
            to. The <Cmp>___Router</Cmp> components create a <IJS>history</IJS>{" "}
            instance for you using props passed to the component.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), holder);`}
        </CodeBlock>

        <Explanation>
          <p>
            With Curi, the router is created prior to rendering. It takes a
            Hickory history object, your routes array, and possibly an options
            object. <a href="https://github.com/pshrmn/hickory">Hickory</a> is
            similar to the <IJS>history</IJS> package used by React Router, but
            has a slight modified API (easier navigation blocking and navigation
            that imitates how anchors work) and more convenient location objects
            (you can use a <IJS>query</IJS> object instead of having to manually
            create a <IJS>search</IJS> string).
          </p>
        </Explanation>
        <CodeBlock>
          {`import { curi } from '@curi/router';
import Browser from '@hickory/browser';
const history = Browser();
const routes = [...];
const router = curi(history, routes);`}
        </CodeBlock>
      </Section>

      <Section title="Rendering" id="rendering">
        <Explanation>
          <p>
            We will walk through the rendering differences between React Router
            and Curi by looking at what happens in each when we navigate to the
            URL with the pathname <IJS>/inbox/test-message-please-ignore</IJS>.
          </p>
        </Explanation>

        <Subsection title="React Router" id="rendering-react-router">
          <Explanation>
            <p>
              React Router matches routes while it renders. It uses the{" "}
              <Cmp>Router</Cmp> component to listen for location changes. Each
              time that the location changes, the application re-renders.
            </p>
            <p>
              The <Cmp>Switch</Cmp> will iterate over its children{" "}
              <Cmp>Route</Cmp>s. The first route, <IJS>"/"</IJS> has an{" "}
              <IJS>exact</IJS> prop, so it only matches when the pathname is{" "}
              <IJS>"/"</IJS>. Since it is not, the next <Cmp>Route</Cmp> will be
              checked. The next route, <IJS>"/inbox"</IJS> matches the beginning
              of the pathname <IJS>"/inbox/test-message-please-ignore"</IJS>. It
              is not an exact match, but that route does not do exact matching,
              so React Router will render its component, <Cmp>Inbox</Cmp>.
            </p>

            <p>
              The <Cmp>Inbox</Cmp> has its own <Cmp>Switch</Cmp> to iterate
              over. Its first route only matches <IJS>"/inbox"</IJS> exactly, so
              it moves on to the next route, which has a <IJS>message</IJS>{" "}
              route param. This route matches and stores{" "}
              <IJS>"test-message-please-ignore"</IJS> as{" "}
              <IJS>match.params.message</IJS>. The <Cmp>Message</Cmp> component
              will then be rendered, which has access to the <IJS>message</IJS>{" "}
              param.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), holder);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/inbox" component={Inbox} />
  </Switch>                 
);

const Inbox = ({ match }) => (
  <Switch>
    <Route
      exact
      path={match.path}
      component={Messages}
    />
    <Route
      exact
      path={\`\${match.path}/:message\`}
      component={Message}
    />
  </Switch>
);

/*
<BrowserRouter>
  <App>
    <Inbox>
      <Message>
    </Inbox>
  </App>
</BrowserRouter>
*/`}
          </CodeBlock>
        </Subsection>
        <Subsection title="Curi" id="rendering-with-curi">
          <Explanation>
            <p>
              With Curi, we also need to re-render our application every time
              that the location changes. We will do this by creating a root Curi
              component by calling the <IJS>curiProvider()</IJS> function, which
              comes from the <IJS>@curi/react-dom</IJS> package, and passing it
              our Curi router. While the name of this component is entirely up
              to you, we will refer to it as the <Cmp>Router</Cmp> here.
            </p>
            <p>
              The <Cmp>Router</Cmp> will setup an observer on the provided
              router so that it can re-render your application whenever there is
              a new <IJS>response</IJS>. The <Cmp>Router</Cmp> expects a
              function as its <IJS>children</IJS> prop (a render-invoked
              function). This function renders the application using the{" "}
              <IJS>response</IJS>.
            </p>
            <p>
              When the <Cmp>Router</Cmp>'s <IJS>children()</IJS> function is
              called, it will receive an object with three properties:
            </p>
            <ol>
              <li>
                <IJS>response</IJS> is the new response object
              </li>
              <li>
                <IJS>navigation</IJS> is an object with additional information
                about the navigation
              </li>
              <li>
                <IJS>router</IJS> is your Curi router (mostly useful if the
                function is defined in a separate file)
              </li>
            </ol>
            <p>
              Above, we added <IJS>response()</IJS> functions to each route. The
              functions set React components as the <IJS>body</IJS> property of
              responses. We can now use <IJS>response.body</IJS> to render those
              components.
            </p>
            <p>
              In the React Router section, we had three components that were
              rendered: <Cmp>App</Cmp>,
              <Cmp>Inbox</Cmp>, and <Cmp>Message</Cmp>. With Curi, only the most
              accurately matched route actually matches. That means that for the
              URL <IJS>/inbox/test-message-please-ignore</IJS>, the{" "}
              <IJS>"Message"</IJS> route will match, but its parent route,{" "}
              <IJS>"Inbox"</IJS> will not, so <IJS>response.body</IJS> will be
              the <Cmp>Message</Cmp> component. Unlike React Router, we don’t
              render <Cmp>Inbox</Cmp> because we did not match the{" "}
              <IJS>inbox</IJS> route.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`import { curiProvider } from "@curi/react-dom";

const router = curi(history, routes);            
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return <Body />;
    }}
  </Router>
), holder);

/*
  <Router>
    <Message />
  </Router>
*/`}
          </CodeBlock>

          <Explanation>
            <Note>
              Wildcard routes (<IJS>{`{ path: '(.*)' }`}</IJS>) can be used to
              easily display a not found page for any location not matched by
              other routes.
            </Note>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  // ...,
  {
    name: "Not Found",
    path: "(.*)",
    response() {
      return { body: NotFound };
    }
  }
];`}
          </CodeBlock>

          <Explanation>
            <p>
              It was mentioned above that there is no need for the{" "}
              <Cmp>App</Cmp> component with Curi. If you want to have an{" "}
              <Cmp>App</Cmp> component, you can render it either inside of the{" "}
              <IJS>children()</IJS> function or as a parent of your{" "}
              <Cmp>Router</Cmp>. This can be useful for rendering content that
              is unrelated to specific routes, like a page header or menu.
            </p>
            <p>
              Rendering the <Cmp>App</Cmp> inside of the <IJS>children()</IJS>{" "}
              function is necessary if any of the components rendered by the{" "}
              <Cmp>App</Cmp> are location aware components, since they need to
              access the Curi router (through React’s context, which the{" "}
              <Cmp>Router</Cmp> provides)
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`function render({ response }) {
  const { body:Body } = response;
  return (
    <App>
      <Body />
    </App>
  );
}
// or
function render({ response }) {
  const { body:Body } = response;
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}`}
          </CodeBlock>

          <Explanation>
            <p>
              What about props that you want to send to your route components?
              Pass them to the <Cmp>Body</Cmp> component that you render. Props
              can be passed individually, but passing the whole{" "}
              <IJS>response</IJS> object is recommended.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`function render({ response }) {
  const { body:Body } = response;
  return <Body response={response} />;
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section title="Links" id="links">
        <Explanation>
          <p>
            You will want to be able to navigate between routes in your
            application. React Router provides a <Cmp>Link</Cmp> component to do
            this, and so does Curi (through the <IJS>@curi/react-dom</IJS>{" "}
            package). There are a few differences to note between these two
            components:
          </p>
        </Explanation>

        <ul>
          <li>
            <Explanation>
              <p>
                React Router expects you to generate the pathname yourself,
                while Curi expects you to pass the name of the route that you
                want to navigate to. Any path parameters are passed to Curi’s{" "}
                <Cmp>Link</Cmp> using the <IJS>params</IJS> prop.
              </p>
            </Explanation>
            <CodeBlock lang="jsx">
              {`// React Router
<Link to='/'>Home</Link>
<Link to={\`/inbox/\${message}\`}>Hello</Link>

// Curi
<Link to='Home'>Home</Link>
<Link to='Message' params={{ message }}>Hello</Link>`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                With React Router, any additional location properties are passed
                to the <Cmp>Link</Cmp> using the <IJS>to</IJS> object. With
                Curi, these properties are passed using the prop name (<IJS>
                  hash
                </IJS>, <IJS>query</IJS> &amp;
                <IJS>state</IJS>).
              </p>
            </Explanation>
            <CodeBlock lang="jsx">
              {`// React Router
<Link to={{ pathname: '/inbox', hash: '#test' }}>
  Inbox
</Link>

// Curi
<Link to='Inbox' hash='test'>Inbox</Link>`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                Active detection with Curi uses an <Cmp>Active</Cmp> component.{" "}
                <Cmp>Active</Cmp>'s <IJS>children</IJS> prop is a render-invoked
                function that receives a boolean <IJS>true</IJS> when the named
                route is active and <IJS>false</IJS> when it is not. You can
                also pass <IJS>{`partial=\{true\}`}</IJS> to partial matches
                (ancestor routes) be considered active (the opposite of React
                Router's <IJS>onlyActiveOnIndex</IJS>).
              </p>
            </Explanation>
            <CodeBlock lang="jsx">
              {`// React Router
<Link
  to='/'
  onlyActiveOnIndex
  activeClassName='active'
>
  Home
</Link>

// Curi
// You need to add @curi/route-active
// to your router object
import active from '@curi/route-active';
const router = curi(history, routes, {
  route: [active()]
});

// The <Active> component determines if a route is active
// and passes true/false to the render-invoked children
// function
<Active name="Home">
  {active => (
    <Link
      to='Home'
      className={active ? "active" : ""}
    >Home</Link>
  )}
</Active>`}
            </CodeBlock>
          </li>
        </ul>
      </Section>

      <Section
        title="Accessing router props from nested components"
        id="router-props"
      >
        <Explanation>
          <p>
            React Router provides a <IJS>withRouter</IJS> higher-order component
            that will inject router props into the wrapped component.
          </p>
          <p>
            Curi provides similar functionality with the <IJS>Curious</IJS>{" "}
            component.
          </p>
          <p>
            <IJS>Curious</IJS> has a render-invoked <IJS>children</IJS>{" "}
            function, which you can use to inject the Curi <IJS>router</IJS>,
            the current <IJS>response</IJS>, and the current{" "}
            <IJS>navigation</IJS> object into components.
          </p>
        </Explanation>
        <CodeBlock>
          {`// React Router
export default withRouter(SomeComponent);

// Curi
export default () => (
  <Curious>
    {({ response }) => (
      <SomeComponent response={response} />
    )}
  </Curious>
);`}
        </CodeBlock>
      </Section>

      <p>
        At this point, hopefully you are comfortable with migrating from React
        Router v4 to Curi. If there are any concepts not covered here that you
        think should be, please feel free to open up an issue{" "}
        <a href="https://github.com/pshrmn/curi/issues">on GitHub</a>.
      </p>
    </React.Fragment>
  );
}
