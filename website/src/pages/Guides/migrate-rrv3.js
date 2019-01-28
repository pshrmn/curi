import React from "react";
import { Link } from "@curi/react-dom";

import {
  HashSection,
  Explanation,
  CodeBlock,
  Note,
  IJS,
  Cmp
} from "../../components/guide/common";

const meta = {
  title: "React Router v2/3"
};

export default function MigrateReactRouterv3Guide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Explanation>
        <p>
          Curi is mostly conceptually similar to React Router versions 2 and 3.
        </p>
        <ol>
          <li>Both use a centralized router.</li>
          <li>
            Both routers are made up of route objects (although with React
            Router some of these are disguised as JSX with <Cmp>Route</Cmp>{" "}
            components).
          </li>
          <li>
            With both Reaft Router and Curi, routes can be nested. This can be
            used to specify child routes that build off of the paths from their
            parent routes.
          </li>
        </ol>
        <p>
          Migration from React Router v2/3 to Curi should not require a complete
          reworking of your application, but there are some key differences.
        </p>
        <ol>
          <li>
            Curi's routing is handled entirely outside of React; there are no{" "}
            <Cmp>Route</Cmp> components.
          </li>
          <li>
            With Curi, when a nested route matches, only that route renders. Any
            ancestor routes that also (partially) match are not rendered. This
            is different from React Router, where ancestors of the best matched
            route also render.
          </li>
        </ol>
      </Explanation>
      <HashSection title="Routes" id="routes">
        <p>Let’s get started with setting up our routes.</p>
        <HashSection
          title="With React Router"
          id="routes-with-react-router"
          tag="h3"
        >
          <Explanation>
            <p>
              In React Router v2/3, there are two ways to define routes. You can
              either use JavaScript objects or JSX <Cmp>Route</Cmp>s (which
              React Router converts to JavaScript objects).
            </p>
            <p>
              Both styles described above define the same route structure for
              three routes: <IJS>/</IJS>, <IJS>/inbox</IJS>, and{" "}
              <IJS>/inbox/:message</IJS>. Each one of these has a component that
              will be rendered when it matches. The <IJS>/inbox/:message</IJS>{" "}
              route has some methods defined to describe its behavior when the
              route enters, updates, and leaves.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`// JavaScript objects
{
  path: '/',
  component: App,
  indexRoute: Home,
  childRoutes: [
    {
      path: 'inbox',
      component: Inbox,
      childRoutes: [
        {
          path: ':message',
          component: Message,
          onEnter: (next) => {...},
          onChange: (prev, next) => {...},
          onLeave: (prev) => {...}
        }
      ]
    }
  ]
// JSX
<Route path='/' component={App}>
  <IndexRoute component={Home} />
  <Route path='inbox' component={Inbox}>
    <Route
      path=':message'
      component={Message}
      onEnter={next => {...}}
      onChange={(prev, next) => {...}}
      onLeave={prev => {...}}
    />
  </Route>
</Route>`}
          </CodeBlock>
        </HashSection>

        <HashSection title="With Curi" id="routes-with-curi" tag="h3">
          <Explanation>
            <p>
              Routes in Curi are always JavaScript objects. Like React Router,
              each route object has a path property that describes the path
              segments that the route matches. React Router v2/3 uses a custom
              path matcher, but Curi uses <IJS>path-to-regexp</IJS>. You can
              read learn how to format paths from the{" "}
              <a href="https://github.com/pillarjs/path-to-regexp">
                <IJS>path-to-regexp</IJS> repo
              </a>
              .
            </p>

            <p>First, we will define the names and paths for our routes.</p>
            <p>
              Each route must also have a unique name. A route's name will be
              used for interacting with it. For example, to navigate to a route,
              you only have to know its name, not its URL.
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
            {`const routes = prepareRoutes([
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

          <Explanation>
            <p>
              Next, we should add our components to each route. We will ignore
              the <Cmp>App</Cmp> component that is used in the React Router
              routes. That is not route specific and will be rendered by our
              application (assuming we actually need it).
            </p>
            <p>
              With Curi, the router creates a "response" object when it matches
              locations. Some of the properties of the response are
              automatically set based on the location and the matching route.
              Others can be set by a route. This is done using the{" "}
              <IJS>response()</IJS> property, which is a function that returns
              an object whose properties will be added to the response. For this
              React application, we want a response's <IJS>body</IJS> property
              to be the React component associated with each route.
            </p>
            <Note>Only known properties will be merged onto the response.</Note>
          </Explanation>
          <CodeBlock>
            {`import { prepareRoutes } from "@curi/router";
            
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import Mesage from './pages/Message';

const routes = prepareRoutes([
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

          <Explanation>
            <p>
              We are close to replicating our React Router routes, but we still
              need to implement the <IJS>on___</IJS> methods for our 
              <IJS>:message</IJS> route. With Curi, routes can have functions
              that are called when they match the new location. These are
              grouped under the route's <IJS>resolve</IJS> object. The{" "}
              <IJS>resolve</IJS> functions are called every time that a route
              matches a location.
            </p>
            <p>
              With React Router, <IJS>onEnter</IJS> is called when the route
              first matches, while <IJS>onChange</IJS> is called when the same
              route matches a new location (e.g. with new path parameters).{" "}
              <IJS>onEnter</IJS> and <IJS>onChange</IJS> are nearly the same;
              the big difference between the two is that <IJS>onChange</IJS>{" "}
              will receive the previous props, which could be used to determine
              which props changed. The functionality for both <IJS>onEnter</IJS>{" "}
              and <IJS>onChange</IJS> can be covered using a <IJS>resolve</IJS>{" "}
              function.
            </p>
            <p>
              There currently is no equivalent to <IJS>onLeave</IJS> with Curi.
              This is mostly because I haven’t seen a compelling need for it. It
              certainly could be implemented, but so far I have not found a
              reason to use that. If you have something you need this
              functionality for, please open up an issue in the GitHub repo.
            </p>
            <p>
              The{" "}
              <Link
                name="Package"
                params={{ package: "router", version: "v1" }}
                hash="route-properties"
              >
                <IJS>@curi/router</IJS> route API documentation
              </Link>{" "}
              covers all of the route properties.
            </p>
          </Explanation>
          <CodeBlock>
            {`const routes = prepareRoutes([
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
        },
        resolve: {
          data: (route) => { return ... },
        }
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

      <HashSection title="Creating the router" id="creating-the-router">
        <Explanation>
          <p>
            With React Router, you create your router by rendering a{" "}
            <Cmp>Router</Cmp>. That either takes the <Cmp>Route</Cmp> components
            as props or the route objects through its <IJS>routes</IJS> prop.
            The <Cmp>Router</Cmp> also takes a <IJS>history</IJS> prop, which is
            either one of the pre-routerured objects (<IJS>browserHistory</IJS>{" "}
            or <IJS>hashHistory</IJS>) or one that you create yourself.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import { Router, browserHistory } from 'react-router';
const routes = prepareRoutes([...]);
ReactDOM.render((
  <Router history={browserHistory} routes={routes} />
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
          {`import { curi, prepareRoutes } from '@curi/router';
import Browser from '@hickory/browser';
const history = Browser();
const routes = prepareRoutes([...]);
const router = curi(history, routes);`}
        </CodeBlock>
      </HashSection>

      <HashSection title="Rendering" id="rendering">
        <Explanation>
          <p>
            We will walk through the rendering differences between React Router
            and Curi by looking at what happens in each when we navigate to the
            URI <IJS>/inbox/test</IJS>.
          </p>
        </Explanation>

        <HashSection
          title="React Router v2/3"
          id="rendering-react-router"
          tag="h3"
        >
          <Explanation>
            <p>
              React Router uses the <Cmp>Router</Cmp> component to subscribe to
              location changes. Each time that the location changes, it walks
              over its routes and determines which route(s!) match.
            </p>
            <p>
              React Router starts by rendering the root component. In the above
              router, that is the <Cmp>App</Cmp>. Next, our <IJS>inbox</IJS>{" "}
              route also matches, so React Router also renders our{" "}
              <Cmp>Inbox</Cmp> component. Finally, the URI{" "}
              <IJS>/inbox/test</IJS> also matches our <IJS>:message</IJS> route
              (which is concatenated with its parents to form the path{" "}
              <IJS>/inbox/:message</IJS>), so <Cmp>Message</Cmp> is rendered as
              well. Each child component is rendered by its parent, so we end up
              with a component tree that looks something like this:
            </p>
            <p>
              With this structure, any routes with children will be rendered
              when one of the children matches. That means that those routes
              need to know how to render based on what type of match they have.
              For example, <Cmp>Inbox</Cmp> needs to know how to render for an
              exact match (the URI is <IJS>/inbox</IJS>) and for a partial match
              (<IJS>/inbox/test</IJS>). Also, if the <Cmp>Inbox</Cmp> needs to
              pass any props to <Cmp>Message</Cmp>, it has to use{" "}
              <IJS>React.cloneElement</IJS>, which works but is not the cleanest
              looking code.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`<App>
  <Inbox>
    <Message>
  </Inbox>
</App>`}
          </CodeBlock>
        </HashSection>

        <HashSection title="Curi" id="rendering-with-curi" tag="h3">
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
              In the React Router HashSection, we had three components that were
              rendered: <Cmp>App</Cmp>,<Cmp>Inbox</Cmp>, and <Cmp>Message</Cmp>.
              With Curi, only the most accurately matched route actually
              matches. That means that for the URL <IJS>/inbox/test</IJS>, the{" "}
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
            {`const routes = prepareRoutes([
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
        </HashSection>
      </HashSection>

      <HashSection title="Links" id="links">
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
<Link name='Home'>Home</Link>
<Link name='Message' params={{ message }}>Hello</Link>`}
            </CodeBlock>
          </li>
          <li>
            <Explanation>
              <p>
                With React Router, any additional location properties are passed
                to the <Cmp>Link</Cmp> using the <IJS>to</IJS> object. With
                Curi, these properties are passed using the prop name (
                <IJS>hash</IJS>, <IJS>query</IJS> &amp;
                <IJS>state</IJS>).
              </p>
            </Explanation>
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
            <Explanation>
              <p>
                Active detection with Curi uses an <Cmp>Active</Cmp> component.{" "}
                <Cmp>Active</Cmp>'s <IJS>children</IJS> prop is a render-invoked
                function that receives a boolean <IJS>true</IJS> when the named
                route is active and <IJS>false</IJS> when it is not. You can
                also pass <IJS>{`partial=\{true\}`}</IJS> to let partial matches
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
      name='Home'
      forward={{
        className: active ? "active" : ""
      }}
    >Home</Link>
  )}
</Active>`}
            </CodeBlock>
          </li>
        </ul>
      </HashSection>

      <HashSection
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
      </HashSection>

      <p>
        At this point, hopefully you are comfortable with migrating from React
        Router v2/3 to Curi. If there are any concepts not covered here that you
        think should be, please feel free to open up an issue{" "}
        <a href="https://github.com/pshrmn/curi/issues">on GitHub</a>.
      </p>
    </React.Fragment>
  );
}
