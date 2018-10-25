import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section, Subsection } from "../../components/layout/Sections";
import { Note } from "../../components/Messages";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Creating a Router"
};

export default function CreatingARouterGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="The Router" id="router-object">
        <Explanation>
          <p>
            The router is the controller of the single-page application. A
            router is created using a <IJS>history</IJS> object and a{" "}
            <IJS>routes</IJS> array.
          </p>
        </Explanation>
        <CodeBlock>
          {`import { curi } from '@curi/router';

const history = Browser();
const routes = [...];
const router = curi(history, routes);`}
        </CodeBlock>
        <Explanation>
          <p>
            The{" "}
            <Link to="Guide" params={{ slug: "history" }}>
              history
            </Link>{" "}
            is used to navigate between locations within an application. The{" "}
            <Link
              to="Guide"
              params={{ slug: "routes-and-responses" }}
              hash="routes"
            >
              routes
            </Link>{" "}
            describe valid locations in an application.
          </p>
        </Explanation>
      </Section>
      <Section title="Navigation" id="navigation">
        <Explanation>
          <p>
            When navigation occurs, the router receives the new location from
            its <IJS>history</IJS> object. This either happens from in-app
            navigation (e.g. clicking a link) or platform navigation (e.g.
            clicking the back button or typing URL in the address bar and
            hitting enter).
          </p>
          <p>
            The router has a <IJS>navigate()</IJS> method to let you navigate
            with code. The function takes the <IJS>name</IJS> of the route you
            want to navigate to and any route <IJS>params</IJS>. The navigation{" "}
            <IJS>method</IJS> controls how the history changes locations, with
            the default behavior acting like clicking a link.
          </p>
        </Explanation>
        <CodeBlock>
          {`router.navigate({
  name: "Photo",
  params: { albumID: 1357, photoID: 02468 },
  hash: "comments"
});
// /photos/1357/02468#comments

router.navigate({
  name: "Login",
  state: { next: location.pathname },
  // replace the current location with the Login location
  // "REPLACE" is ideal for redirects
  method: "REPLACE"
});`}
        </CodeBlock>
        <Explanation>
          <Note>
            Render interfaces, like{" "}
            <Link to="Package" params={{ package: "react-dom" }}>
              <IJS>@curi/react-dom</IJS>
            </Link>, will call <IJS>router.nagivate()</IJS> for you when the
            user clicks a link.
          </Note>
        </Explanation>
      </Section>

      <Section title="Response Handlers" id="response-handlers">
        <Explanation>
          <p>
            Curi has a concept of "response" objects, which provide the
            application with information about the route that matches the
            current location.
          </p>
          <p>
            Response handlers are functions that will be called when there is a
            new response. There are three types of response handlers: observers,
            one time functions, and side effects.
          </p>
          <p>
            Side effects are passed to the router when you are creating it.
            These are best suited for non-rendering tasks. You can read more
            about them in the{" "}
            <Link to="Guide" params={{ slug: "side-effects" }}>
              side effects guide
            </Link>.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = curi(history, routes, {
  sideEffects: [scroll, title]
})`}
        </CodeBlock>
        <Explanation>
          <p>
            "One time" response handlers, registered with{" "}
            <IJS>router.once()</IJS>, will only be called one time. If a
            response already exists, then the response handler will be called
            immediately (unless configured not to). Otherwise, the one time
            response handler will be called after the next response is emitted.
          </p>
          <p>
            The primary use case for one time functions is to wait for the
            initial response to be generated before rendering.
          </p>
        </Explanation>
        <CodeBlock>
          {`const router = cur(history, routes);
router.once(() => {
  // this is not called until the initial response is ready
  // so we can safely render now
});`}
        </CodeBlock>
        <Explanation>
          <p>
            Observers are passed to the router using <IJS>router.observe()</IJS>.
            Unlike one time functions, these will be called for every response
            emitted by the router (until you tell the router to stop calling
            it). You most likely will not need to call this yourself because the
            renderer implementations setup observers for you.
          </p>
        </Explanation>
        <CodeBlock>
          {`const stop = router.observe(({ response }) => {
  console.log('new response!', response);
});
// ...
stop();
// no longer observing`}
        </CodeBlock>

        <Explanation>
          <p>
            If you have any asynchronous routes (routes with <IJS>resolve</IJS>{" "}
            functions), <IJS>router.once()</IJS> should be used to delay the
            initial render until after the initial response is ready.
          </p>
        </Explanation>
        <CodeBlock>
          {`// wait for initial response to be ready
router.once(() => {
  // safe to render async routes now
});`}
        </CodeBlock>
      </Section>
      <Section title="Rendering" id="rendering">
        <Explanation>
          <p>
            Rendering is left to whatever rendering library you are using. The
            way that Curi interfaces with each of them varies, but they all use
            observers to be notified when there is a new response.
          </p>
        </Explanation>

        <Explanation>
          <p>
            <Link to="Package" params={{ package: "@react-dom" }}>
              <IJS>@curi/react-dom</IJS>
            </Link>{" "}
            uses a <Cmp>Router</Cmp> with a render-invoked <IJS>children</IJS>{" "}
            function that will be called whenever there is a new response.
          </p>
          <p>
            In React applications, <IJS>response.body</IJS> should be a React
            component, so rendering the application means creating an element
            from <IJS>response.body</IJS>.
          </p>
          <p>
            The{" "}
            <Link to="Tutorial" params={{ slug: "react-basics" }}>
              React Basics Tutorial
            </Link>{" "}
            gets into more detail about how this works.
          </p>
        </Explanation>
        <CodeBlock>
          {`// React
const Router = curiProvider(router);

ReactDOM.render((
  <Router>
    {({ response }) => {
      const { body:Body } = response;
      return <Body />;
    }}
  </Router>
), document.getElementById('root'));`}
        </CodeBlock>

        <Explanation>
          <p>
            <Link to="Package" params={{ package: "@react-dom" }}>
              <IJS>@curi/vue</IJS>
            </Link>{" "}
            sets up reactive objects that update when there is a new response.{" "}
            <Cmp>component :is</Cmp> can be used to render the <IJS>body</IJS>{" "}
            component.
          </p>
          <p>
            The{" "}
            <Link to="Tutorial" params={{ slug: "react-basics" }}>
              Vue Basics Tutorial
            </Link>{" "}
            details how to use Vue and Curi.
          </p>
        </Explanation>
        <CodeBlock>
          {`// Vue
Vue.use(CuriPlugin, { router });
new Vue({
  el: '#app',
  template: '<app />',
  components: { app }
});`}
        </CodeBlock>

        <Explanation>
          <p>
            <Link to="Package" params={{ package: "@react-dom" }}>
              <IJS>@curi/svelte</IJS>
            </Link>{" "}
            uses the Svelte store and <Cmp>svelte:component</Cmp> to render.
          </p>
        </Explanation>
        <CodeBlock>
          {`// Svelte
const store = curiStore(router);
new app({ target, store });`}
        </CodeBlock>
      </Section>
    </React.Fragment>
  );
}
