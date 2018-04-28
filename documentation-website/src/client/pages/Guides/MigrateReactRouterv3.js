import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
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
    <SideBySide>
      <Explanation>
        <p>
          The Curi router is somewhat similar to React Router versions 2 and 3,
          so migration is fairly easy. For instance, both use a centralized
          router. Both routers are made up of route objects (although with React
          Router some of these are disguised as JSX with <Cmp>Route</Cmp>{" "}
          components). With both, routes can be nested, allowing child routes to
          build off of the paths from their parent routes.
        </p>
        <p>
          Migration from React Router v2/3 to Curi should not require a complete
          reworking of your application, but there are some key differences.
        </p>
        <ol>
          <li>
            The routing is handled entirely outside of React. With Curi, there
            are no <Cmp>Route</Cmp> components.
          </li>
          <li>
            With Curi, when a nested route matches, only that route renders. Any
            ancestor routes that also (partially) match are not rendered. This
            is different from React Router, where ancestors of the best matched
            route also render.
          </li>
        </ol>
      </Explanation>
    </SideBySide>

    <Section title="Routes" id="routes">
      <p>Let’s get started with setting up our routes.</p>

      <Subsection title="With React Router" id="routes-with-react-router">
        <SideBySide>
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
        </SideBySide>
      </Subsection>
      <Subsection title="With Curi" id="routes-with-curi">
        <SideBySide>
          <Explanation>
            <p>
              Routes in Curi are always JavaScript objects. Like React Router,
              each route object has a path property that describes the path
              segments that the route matches. React Router v2/3 uses a custom
              path matcher, but Curi uses <IJS>path-to-regexp</IJS>. You can
              read learn how to format paths from the{" "}
              <a href="https://github.com/pillarjs/path-to-regexp">
                <IJS>path-to-regexp</IJS> repo
              </a>.
            </p>

            <p>First, we will just define the paths for our routes.</p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
  {
    path: ''
  },
  {
    path: 'inbox',
    children: [
      {
        path: ':message'
      }
    ]
  }
];`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              The biggest difference between the Curi paths and the React Router
              paths is that with Curi, you never include a forward slash at the
              beginning of the path. This means that while the root path for
              React Router is <IJS>'/'</IJS>, the root path for Curi is{" "}
              <IJS>''</IJS>.
            </p>
            <p>
              Next, we should add our components to each route. We will ignore
              the <Cmp>App</Cmp> component that is used in the React Router
              routes. That is not route specific and will be rendered by our
              application (assuming we actually need it).
            </p>
            <p>
              With Curi routes, we have a <IJS>response()</IJS> function. The
              object returned by <IJS>response()</IJS> is used to modify the
              response that the application will use to render. For this React
              application, we want our <IJS>body</IJS> property to be the React
              component associated with each route.
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
        }
      }
    ]
  }
];`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              We are close to replicating our React Router routes, we just have
              to implement the <IJS>on___</IJS> methods for our <IJS>
                :message
              </IJS>{" "}
              route. With Curi, routes can have functions that are called when
              they match the new loaction. These are <IJS>on.initial()</IJS> and{" "}
              <IJS>on.every()</IJS>. <IJS>on.initial()</IJS> is useful for tasks
              that only need to be run once per route, like the code splitting
              mentioned above. <IJS>on.every()</IJS> will be called every time
              that a route matches, so it is ideal for data loading.
            </p>
            <p>
              With React Router, <IJS>onEnter</IJS> is called when the route
              first matches, while <IJS>onChange</IJS> is called when the same
              route matches a new location (e.g. with new path parameters).{" "}
              <IJS>onEnter</IJS> and <IJS>onChange</IJS> are nearly the same;
              the big difference between the two is that <IJS>onChange</IJS>{" "}
              will receive the previous props, which could be used to determine
              which props changed. When converting these to Curi, we will use{" "}
              <IJS>on.every()</IJS> for both.
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
              <Link to="Guide" params={{ slug: "routes" }} hash="match">
                routes guide
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
        on: {
          every: (route) => { return ... },
        }
      }
    ]
  }
];`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              We now have the equivalent routes implemented in Curi, but we have
              one last step. With Curi, each route has to have a unique name.
            </p>
            <p>
              Curi uses route names to allow you to interact with routes. For
              example, you can navigate to the “Inbox” route just by knowing its
              name instead of its URI. This can be especially handy when dealing
              with complicated pathnames or if you need to change the URI
              structure of your website. With Curi, you never have to write a
              URI yourself!
            </p>
          </Explanation>
          <CodeBlock>
            {`const routes = [
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
        on: {
          every: (route) => { return ... },
        }
      }
    ]
  }
];`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <p>
        Once your routes have been defined, you can move on to creating your
        Curi router.
      </p>
    </Section>

    <Section title="Creating the router" id="creating-the-router">
      <SideBySide>
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
const routes = [...];
ReactDOM.render((
  <Router history={browserHistory} routes={routes} />
), holder);`}
        </CodeBlock>
      </SideBySide>
      <SideBySide>
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
          {`import curi from '@curi/core';
import Browser from '@hickory/browser';
const history = Browser();
const routes = [...];
const router = curi(history, routes);`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="Rendering" id="rendering">
      <SideBySide>
        <Explanation>
          <p>
            We will walk through the rendering differences between React Router
            and Curi by looking at what happens in each when we navigate to the
            URI <IJS>/inbox/test-message-please-ignore</IJS>.
          </p>
        </Explanation>
      </SideBySide>
      <Subsection title="React Router v2/3" id="rendering-react-router">
        <SideBySide>
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
              <IJS>/inbox/test-message-please-ignore</IJS> also matches our <IJS
              >
                :message
              </IJS>{" "}
              route (which is concatenated with its parents to form the path{" "}
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
              (<IJS>/inbox/test-message-please-ignore</IJS>). Also, if the{" "}
              <Cmp>Inbox</Cmp> needs to pass any props to <Cmp>Message</Cmp>, it
              has to use <IJS>React.cloneElement</IJS>, which works but is not
              the cleanest looking code.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`<App>
  <Inbox>
    <Message>
  </Inbox>
</App>`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
      <Subsection title="Curi" id="rendering-with-curi">
        <SideBySide>
          <Explanation>
            <p>
              With Curi, we also need to re-render our application every time
              that the location changes. We will do this using the{" "}
              <Cmp>CuriProvider</Cmp> component, which comes from the{" "}
              <IJS>@curi/react</IJS> package.
            </p>
            <p>
              The <Cmp>CuriProvider</Cmp> takes a <IJS>router</IJS> prop, which
              it will use to listen for the router to emit new responses (by
              internally calling <IJS>router.respond()</IJS>) The{" "}
              <Cmp>CuriProvider</Cmp> places the new <IJS>response</IJS> and{" "}
              <IJS>navigation</IJS> (alongside the <IJS>router</IJS> object) on
              React's <IJS>context</IJS> so that child components will be able
              to access those values. <Cmp>CuriProvider</Cmp> also expects a
              function as its <IJS>children</IJS> prop (a render-invoked prop).
            </p>
            <p>
              We will also use <IJS>router.respond()</IJS> to wait for the
              initial response to be emitted before rendering.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`router.respond(() => {
  ReactDOM.render((
    <CuriProvider router={router}>
      {({ response }) => {...}}
    </CuriProvider>
  ), holder);
});`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              So what should your <IJS>children</IJS> function look like? When
              it is called, the function will receive an object with three
              properties: <IJS>response</IJS>, the new response object,{" "}
              <IJS>navigation</IJS>, an object with additional information about
              the navigation, and <IJS>router</IJS>, your Curi router. We will
              ignore the <IJS>navigation</IJS> and <IJS>router</IJS> here
              because the <IJS>response</IJS> is what we really want.
            </p>
            <p>
              Earlier, we added <IJS>body</IJS> properties to each of the routes
              and said that when a route matches, that function would be called
              and its return value would be attached to the response. That
              means, that inside of our <IJS>children</IJS> function, we can
              access the matched route’s component as <IJS>response.body</IJS>.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`function render({ response }) {
  const { body:Body } = response;
  return <Body />;
}`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              That isn’t perfect because it doesn’t consider what happens when
              there is no body (which happens if none of the routes match the
              location or you don't set it in a route's <IJS>response()</IJS>{" "}
              function).
            </p>
            <Note>
              Wildcard routes (<IJS>{`{ path: '(.*)' }`}</IJS>) can be used to
              easily display a not found page for any location not matched by
              other routes.
            </Note>
            <p>
              Let’s get back to our <IJS>response</IJS> object. In the React
              Router section, we had three components that were rendered:{" "}
              <Cmp>App</Cmp>,
              <Cmp>Inbox</Cmp>, and <Cmp>Message</Cmp>. With Curi, only the most
              accurately matched route actually matches. That means that for the
              URI <IJS>/inbox/test-message-please-ignore</IJS>, the{" "}
              <IJS>"Message"</IJS> route will match, but its parent route,{" "}
              <IJS>"Inbox"</IJS> will not. The <IJS>response.body</IJS> will be
              the <Cmp>Message</Cmp> component, so that is what our{" "}
              <IJS>render</IJS> function will render. We don’t render{" "}
              <Cmp>Inbox</Cmp> because we did not match the <IJS>inbox</IJS>{" "}
              route.
            </p>
            <p>
              It was mentioned above that there is no need for the{" "}
              <Cmp>App</Cmp> component with Curi. If you want to have an{" "}
              <Cmp>App</Cmp> component, you can render it either inside of the{" "}
              <IJS>render</IJS> function or as a parent of your{" "}
              <Cmp>CuriProvider</Cmp>. This can be useful for rendering content
              that is unrelated to specific routes, like a page header or menu.
            </p>
            <p>
              Rendering the <Cmp>App</Cmp> inside of the <IJS>children</IJS>{" "}
              function is necessary if any of the components rendered by the{" "}
              <Cmp>App</Cmp> are location aware components, since they need to
              access the Curi router (through React’s context, which the{" "}
              <Cmp>CuriProvider</Cmp> provides)
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
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              What about props that you want to send to your route components?
              Just pass them to the <Cmp>Body</Cmp> component that you render.
            </p>
            <p>
              The one catch here is that you will be passing the same props to
              all of your route components. You could add fine-grained control
              by using <IJS>response.name</IJS> and a <IJS>switch</IJS> or{" "}
              <IJS>if</IJS>/<IJS>else</IJS> chain, but this is probably
              overkill. If you’re worried about polluting the route component’s
              props, just pass the whole response object.
            </p>
          </Explanation>
          <CodeBlock lang="jsx">
            {`function render({ response }) {
  const { body:Body, data, params } = response;
  return <Body data={data} params={params} />;
}`}
          </CodeBlock>
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Links" id="links">
      <SideBySide>
        <Explanation>
          <p>
            You will want to be able to navigate between routes in your
            application. React Router provides a <Cmp>Link</Cmp> component to do
            this, and so does Curi (through the <IJS>@curi/react</IJS> package).
            There are a few differences to note between these two components:
          </p>
        </Explanation>
      </SideBySide>
      <ul>
        <li>
          <SideBySide>
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
          </SideBySide>
        </li>
        <li>
          <SideBySide>
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
          </SideBySide>
        </li>
        <li>
          <SideBySide>
            <Explanation>
              <p>
                Active detection with Curi uses an <Cmp>Active</Cmp> component.{" "}
                <Cmp>Active</Cmp>'s <IJS>children</IJS> prop is a render-invoked
                function that receives a boolean <IJS>true</IJS> when the named
                route is active and <IJS>false</IJS> when it is not. You can
                also pass <IJS>{`partial=\{true\}`}</IJS> to allow for partial
                matches to be considered active (the opposite of React Router's{" "}
                <IJS>onlyActiveOnIndex</IJS>).
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
// prop
<Active name="Home">
  {active => (
    <Link
      to='Home'
      className={active ? "active" : ""}
    >Home</Link>
  )}
</Active>`}
            </CodeBlock>
          </SideBySide>
        </li>
      </ul>
    </Section>

    <Section
      title="Accessing router props from nested components"
      id="router-props"
    >
      <SideBySide>
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
            <IJS>Curious</IJS> has a render-invoked <IJS>children</IJS> prop,
            which you can use to inject the Curi <IJS>router</IJS>, the current{" "}
            <IJS>response</IJS>, and the current <IJS>navigation</IJS> object
            into components.
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
      </SideBySide>
    </Section>

    <p>
      At this point, hopefully you are comfortable with migrating from React
      Router v2/3 to Curi. If there are any concepts not covered here that you
      think should be, please feel free to open up an issue{" "}
      <a href="https://github.com/pshrmn/curi/issues">on GitHub</a>.
    </p>
  </BaseGuide>
);
