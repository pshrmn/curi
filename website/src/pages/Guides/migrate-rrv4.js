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
  title: "React Router v4"
};

const rrRoutesMeta = {
  title: "With React Router",
  hash: "routes-with-react-router"
};
const curiRoutesMeta = {
  title: "With Curi",
  hash: "routes-with-curi"
};
const routesMeta = {
  title: "Routes",
  hash: "routes",
  children: [rrRoutesMeta, curiRoutesMeta]
};

const creatingMeta = {
  title: "Creating the router",
  hash: "creating-the-router"
};

const rrRenderingMeta = {
  title: "React Router",
  hash: "rendering-react-router"
};
const curiRenderingMeta = {
  title: "Curi",
  hash: "rendering-with-curi"
};
const renderingMeta = {
  title: "Rendering",
  hash: "rendering",
  children: [rrRenderingMeta, curiRenderingMeta]
};

const linksMeta = {
  title: "Links",
  hash: "links"
};

const propsMeta = {
  title: "Accessing router props from nested components",
  hash: "router-props"
};

const contents = [
  routesMeta,
  creatingMeta,
  renderingMeta,
  linksMeta,
  propsMeta
];

function MigrateReactRouterv4Guide() {
  return (
    <React.Fragment>
      <PlainSection>
        <h1>{meta.title}</h1>

        <p>
          React Router v4 isn't like most other routers because it lacks a
          centralized configuration. Migrating to Curi mostly involves
          re-centralizing your routes to simplify route management.
        </p>
      </PlainSection>

      <HashSection meta={routesMeta}>
        <p>Let’s get started with setting up our routes.</p>
        <HashSection meta={rrRoutesMeta} tag="h3">
          <p>
            With React Router v4, <IJS>Route</IJS>s are defined in components.
            They are usually grouped together under a <IJS>Switch</IJS> so that
            only a single route from a group renders. Nested routes are rendered
            inside of the compnent rendered by the parent <IJS>Route</IJS>
          </p>

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
        </HashSection>

        <HashSection meta={curiRoutesMeta} tag="h3">
          <p>
            Routes in Curi are JavaScript objects. They are grouped together in
            an array of "top-level" routes. Nested routes are grouped under
            their parent route's <IJS>children</IJS> property.
          </p>

          <p>First, we will define the names and paths for our routes.</p>
          <p>
            Each route must have a unique name. A route's name will be used for
            interacting with it. For example, to navigate to a route, you only
            have to know its name, not its URL.
          </p>
          <p>
            The biggest difference between the Curi paths and the React Router
            paths is that with Curi, you never include a forward slash at the
            beginning of the path. This means that while the root path for React
            Router is <IJS>'/'</IJS>, the root path for Curi is <IJS>''</IJS>.
          </p>

          <CodeBlock>
            {`const routes = prepare_routes([
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
]);`}
          </CodeBlock>

          <p>Next, we should add our components to each route.</p>
          <p>
            Curi routes can have a <IJS>response</IJS> property, which is a
            function that returns an object of properties to merge onto the
            response that we will be using to render. For this React
            application, we want a response's <IJS>body</IJS> property to be the
            React component associated with each route.
          </p>

          <CodeBlock>
            {`import { prepare_routes } from "@curi/router";
            
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Mesage from './pages/Message';

const routes = prepare_routes([
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
]);`}
          </CodeBlock>

          <p>
            With React Router v4, a component's lifecycle methods are used for
            loading data, code splitting, and other non-rendering tasks. With
            Curi, routes can have a <IJS>resolve</IJS> function that is called
            when thee routes matches the new location.
          </p>
          <p>
            The{" "}
            <Link
              name="Package"
              params={{ package: "router", version: "v1" }}
              hash="route-objects"
            >
              <IJS>@curi/router</IJS> route API documentation
            </Link>{" "}
            covers all of the route properties.
          </p>

          <CodeBlock>
            {`const routes = prepare_routes([
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
        resolve(match) { return ... },
      }
    ]
  }
]);`}
          </CodeBlock>
        </HashSection>
        <p>
          Once your routes have been defined, you can move on to creating your
          Curi router.
        </p>
      </HashSection>

      <HashSection meta={creatingMeta}>
        <p>
          With React Router, you create your router by rendering a{" "}
          <IJS>Router</IJS> component. This may be a <IJS>BrowserRouter</IJS>, a{" "}
          <IJS>HashRouter</IJS>, a <IJS>MemoryRouter</IJS>, or a plain{" "}
          <IJS>Router</IJS> that you pass your own <IJS>history</IJS> instance
          to. The <IJS>___Router</IJS> components create a <IJS>history</IJS>{" "}
          instance for you using props passed to the component.
        </p>

        <CodeBlock lang="jsx">
          {`import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), holder);`}
        </CodeBlock>

        <p>
          With Curi, the router is created prior to rendering. It takes a
          Hickory history function, your routes array, and possibly an options
          object. <a href="https://github.com/pshrmn/hickory">Hickory</a> is
          similar to the <IJS>history</IJS> package used by React Router, but
          has an API tailored for asynchronous applications.
        </p>

        <CodeBlock>
          {`import { curi, prepare_routes } from '@curi/router';
import { browser } from '@hickory/browser';
const routes = prepare_routes([...]);
const router = create_router(browser, routes);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={renderingMeta}>
        <p>
          We will walk through the rendering differences between React Router
          and Curi by looking at what happens in each when we navigate to the
          URL with the pathname <IJS>/inbox/test</IJS>.
        </p>

        <HashSection meta={rrRenderingMeta} tag="h3">
          <p>
            React Router matches routes while it renders. It uses the{" "}
            <IJS>Router</IJS> component to listen for location changes. Each
            time that the location changes, the application re-renders.
          </p>
          <p>
            The <IJS>Switch</IJS> will iterate over its children{" "}
            <IJS>Route</IJS>s. The first route, <IJS>"/"</IJS> has an{" "}
            <IJS>exact</IJS> prop, so it only matches when the pathname is{" "}
            <IJS>"/"</IJS>. Since it is not, the next <IJS>Route</IJS> will be
            checked. The next route, <IJS>"/inbox"</IJS> matches the beginning
            of the pathname <IJS>"/inbox/test"</IJS>. It is not an exact match,
            but that route does not do exact matching, so React Router will
            render its component, <IJS>Inbox</IJS>.
          </p>

          <p>
            The <IJS>Inbox</IJS> has its own <IJS>Switch</IJS> to iterate over.
            Its first route only matches <IJS>"/inbox"</IJS> exactly, so it
            moves on to the next route, which has a <IJS>message</IJS> route
            param. This route matches and stores{" "}
            <IJS>"test-message-please-ignore"</IJS> as{" "}
            <IJS>match.params.message</IJS>. The <IJS>Message</IJS> component
            will then be rendered, which has access to the <IJS>message</IJS>{" "}
            param.
          </p>

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
        </HashSection>

        <HashSection meta={curiRenderingMeta} tag="h3">
          <p>
            With Curi, we also need to re-render our application every time that
            the location changes. We will do this by creating a root Curi
            component by calling the <IJS>create_router_component()</IJS>{" "}
            function, which comes from the <IJS>@curi/react-dom</IJS> package,
            and passing it our Curi router. While the name of this component is
            entirely up to you, we will refer to it as the <IJS>Router</IJS>{" "}
            here.
          </p>
          <p>
            The <IJS>Router</IJS> will setup an observer on the provided router
            so that it can re-render your application whenever there is a new{" "}
            <IJS>response</IJS>. The <IJS>Router</IJS> expects a function as its{" "}
            <IJS>children</IJS> prop (a render-invoked function). This function
            renders the application using the <IJS>response</IJS>.
          </p>
          <p>
            When the <IJS>Router</IJS>'s <IJS>children()</IJS> function is
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
            Above, we added <IJS>response</IJS> functions to each route. The
            functions set React components as the <IJS>body</IJS> property of
            responses. We can now use <IJS>response.body</IJS> to render those
            components.
          </p>
          <p>
            In the React Router section, we had three components that were
            rendered: <IJS>App</IJS>,<IJS>Inbox</IJS>, and <IJS>Message</IJS>.
            With Curi, only the most accurately matched route actually matches.
            That means that for the URL <IJS>/inbox/test</IJS>, the{" "}
            <IJS>"Message"</IJS> route will match, but its parent route,{" "}
            <IJS>"Inbox"</IJS> will not, so <IJS>response.body</IJS> will be the{" "}
            <IJS>Message</IJS> component. Unlike React Router, we don’t render{" "}
            <IJS>Inbox</IJS> because we did not match the <IJS>inbox</IJS>{" "}
            route.
          </p>

          <CodeBlock lang="jsx">
            {`import { create_router_component, useCuri } from "@curi/react-dom";

const router = create_router(browser, routes);            
const Router = create_router_component(router);

function App() {
  const { response } = useCuri();
  const { body:Body } = response;
  return <Body response={response} />;
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), holder);

/*
<Router>
  <App>
    <Message />
  </App>
</Router>
*/`}
          </CodeBlock>

          <Note>
            <p>
              Wildcard routes (<IJS>{`{ path: '(.*)' }`}</IJS>) can be used to
              easily display a not found page for any location not matched by
              other routes.
            </p>
          </Note>

          <CodeBlock>
            {`const routes = prepare_routes([
  // ...,
  {
    name: "Not Found",
    path: "(.*)",
    response() {
      return { body: NotFound };
    }
  }
]);`}
          </CodeBlock>

          <p>
            It was mentioned above that there is no need for the <IJS>App</IJS>{" "}
            component with Curi. If you want to have an <IJS>App</IJS>{" "}
            component, you can render it either inside of the{" "}
            <IJS>children()</IJS> function or as a parent of your{" "}
            <IJS>Router</IJS>. This can be useful for rendering content that is
            unrelated to specific routes, like a page header or menu.
          </p>
          <p>
            Rendering the <IJS>App</IJS> inside of the <IJS>children()</IJS>{" "}
            function is necessary if any of the components rendered by the{" "}
            <IJS>App</IJS> are location aware components, since they need to
            access the Curi router (through React’s context, which the{" "}
            <IJS>Router</IJS> provides)
          </p>

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

          <p>
            What about props that you want to send to your route components?
            Pass them to the <IJS>Body</IJS> component that you render. Props
            can be passed individually, but passing the whole{" "}
            <IJS>response</IJS> object is recommended.
          </p>

          <CodeBlock lang="jsx">
            {`function render({ response }) {
  const { body:Body } = response;
  return <Body response={response} />;
}`}
          </CodeBlock>
        </HashSection>
      </HashSection>

      <HashSection meta={linksMeta}>
        <p>
          You will want to be able to navigate between routes in your
          application. React Router provides a <IJS>Link</IJS> component to do
          this, and so does Curi (through the <IJS>@curi/react-dom</IJS>{" "}
          package). There are a few differences to note between these two
          components:
        </p>

        <ul>
          <li>
            <p>
              React Router expects you to generate the pathname yourself, while
              Curi expects you to pass the name of the route that you want to
              navigate to. Any path parameters are passed to Curi’s{" "}
              <IJS>Link</IJS> using the <IJS>params</IJS> prop.
            </p>

            <CodeBlock lang="jsx">
              {`// React Router
<Link to='/'>Home</Link>
<Link to={\`/inbox/\${message}\`}>Hello</Link>

// Curi
<Link name='Home'>Home</Link>
<Link name='Message' params={{ message }}>Hello</Link>`}
            </CodeBlock>
          </li>
          <li>
            <p>
              With React Router, any additional location properties are passed
              to the <IJS>Link</IJS> using the <IJS>to</IJS> object. With Curi,
              these properties are passed using the prop name (<IJS>hash</IJS>,{" "}
              <IJS>query</IJS> &amp;
              <IJS>state</IJS>).
            </p>

            <CodeBlock lang="jsx">
              {`// React Router
<Link to={{ pathname: '/inbox', hash: '#test' }}>
  Inbox
</Link>

// Curi
<Link name='Inbox' hash='test'>Inbox</Link>`}
            </CodeBlock>
          </li>
          <li>
            <p>
              Active detection with Curi is done using the <IJS>useActive</IJS>{" "}
              hook. The hook takes the name of the route (and any required
              params) and returns a boolean to indicate if the route is active.
              You can also use its <IJS>partial</IJS> option to detect when
              ancestor routes are active (the opposite of React Router's{" "}
              <IJS>onlyActiveOnIndex</IJS>).
            </p>

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
const router = create_router(browser, routes, {
  route: [active()]
});

// The <Active> component determines if a route is active
// and passes true/false to the render-invoked children
// function
const active = useActive("Home");
const className = active ? "active" : "";
<Link name='Home' forward={{ className }}>
  Home
</Link>`}
            </CodeBlock>
          </li>
        </ul>
      </HashSection>

      <HashSection meta={propsMeta}>
        <p>
          React Router provides a <IJS>withRouter</IJS> higher-order component
          that will inject router props into the wrapped component.
        </p>
        <p>
          Curi provides similar functionality with the <IJS>Curious</IJS>{" "}
          component.
        </p>

        <p>
          The best way to get router data with Curi is to use the{" "}
          <Link
            name="Package"
            params={{ package: "react-dom", version: "v2" }}
            hash="useCuri"
          >
            <IJS>useCuri</IJS> hook
          </Link>
          .
        </p>

        <CodeBlock>
          {`// React Router
export default withRouter(SomeComponent);

// Curi
function SomeComponent() {
  const { response } = useCuri();
  return ...
}`}
        </CodeBlock>
      </HashSection>

      <PlainSection>
        <p>
          At this point, hopefully you are comfortable with migrating from React
          Router v4 to Curi. If there are any concepts not covered here that you
          think should be, please feel free to open up an issue{" "}
          <a href="https://github.com/pshrmn/curi/issues">on GitHub</a>.
        </p>
      </PlainSection>
    </React.Fragment>
  );
}

export { MigrateReactRouterv4Guide as component, contents };
