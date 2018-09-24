import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

export default function NavigationAndObservingGuide() {
  return (
    <React.Fragment>
      <Explanation>
        <p>
          Navigation and observation are closely linked. Navigation is used to
          change locations, while observation is used to detect navigation
          changes and react (e.g. re-render the application).
        </p>
      </Explanation>

      <Section title="Navigation" id="navigation">
        <Explanation>
          <p>
            When you create a router, you pass it a history object. That history
            object is responsible for tracking all navigation within your
            application. Navigation can be triggered a variety of ways.
          </p>
          <p>
            The first type is "external" navigation, meaning it comes from
            outside of the application. For a website, this would be navigating
            by entering a URL in the address bar or by pressing the browser's
            forward/back buttons.
          </p>
          <p>
            The second type of navigation is "internal", where you use code to
            navigate to a new location. This is predominantly done by clicking
            links.
          </p>
          <p>
            This guide is only going to discuss how to perform internal
            navigation, since that is the only type that you need to perform
            with code.
          </p>
        </Explanation>
        <CodeBlock>
          {`import Browser from "@hickory/browser";
import { curi } from "@curi/router";

import routes from "./routes";

// this history object is responsible for
// tracking navigation
const history = Browser();

const router = curi(history, routes);`}
        </CodeBlock>

        <Subsection title="Navigation With History" id="with-history">
          <Explanation>
            <p>
              Locations are stored in what is essentially an array (this varies
              by history type). An index is used to keep track of which location
              in the array is the current location.
            </p>
            <Note>
              With the browser and hash histories, you cannot actually access
              the array of locations/index. Browsers do not expose this because
              accessing this data could cause security issues.
            </Note>
          </Explanation>
          <CodeBlock>
            {`// array of locations
[
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
// index = 2, current location = { pathname: "/three" }`}
          </CodeBlock>

          <Explanation>
            <p>
              There are three ways to change locations: popping, pushing, and
              replacing and two methods for making these changes:{" "}
              <IJS>history.go()</IJS> and <IJS>history.navigate()</IJS>.
            </p>
          </Explanation>

          <Subsection tag="h4" title="Pop" id="navigation-pop">
            <Explanation>
              <p>
                Popping means that you change the index to another (valid) index
                in the array. Popping is performed by specifying how many
                locations forward (positive numbers) or backward (negative
                numbers) you want to go. When you click a browser's back button,
                that is essentially popping by negative one.
              </p>
              <p>
                The history object's <IJS>go()</IJS> function is used for
                popping between locations.
              </p>
            </Explanation>
            <CodeBlock data-line="9,16">
              {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2
// current location = { pathname: "/three" }

history.go(-2)

locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 0
// current location = { pathname: "/one" }`}
            </CodeBlock>
          </Subsection>
          <Subsection tag="h4" title="Push" id="navigation-push">
            <Explanation>
              <p>
                Pushing adds a new location after the current location in the
                array. Pushing is destructive because if there were any
                locations after the current location, they are lost when you
                push a new location.
              </p>
              <p>
                The history object's <IJS>navigate()</IJS> method is used for
                pushing new locations. In order to ensure that a location is
                pushed, the <IJS>"PUSH"</IJS> argument should be passed to the
                method call.
              </p>
            </Explanation>
            <CodeBlock data-line="9,13,15">
              {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 0
// current location = { pathname: "/one" }

history.navigate("/four", "PUSH")

locations = [
  { pathname: "/one" },
  { pathname: "/four" }
]
index = 1
// current location = { pathname: "/four" }`}
            </CodeBlock>
          </Subsection>
          <Subsection tag="h4" title="Replace" id="navigation-replace">
            <Explanation>
              <p>
                Replacing replaces the location at the current index with a new
                location. When you replace the current location, it has no
                effect on locations after the current one.
              </p>
              <p>
                The history object's <IJS>navigate()</IJS> method is used for
                replacing locations. In order to ensure that a location is
                replaced, the <IJS>"REPLACE"</IJS> argument should be passed to
                the method call.
              </p>
            </Explanation>
            <CodeBlock data-line="9,14">
              {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2
// current location = { pathname: "/three" }

history.navigate("/four", "REPLACE")

locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/four" }
]
index = 2
// current location = { pathname: "/four" }`}
            </CodeBlock>
          </Subsection>
          <Subsection tag="h4" title="Anchor" id="navigation-anchor">
            <Explanation>
              <p>
                The <IJS>history.navigate()</IJS> method has one other way of
                navigating, which is also its default method. This method is
                called <IJS>"ANCHOR"</IJS> because it simulates how clicking an
                anchor in a non-single-page application works.
              </p>
              <p>
                Anchor navigation is a hybrid of pushing and replacing. If you
                attempt to navigate to the same location as the current location
                (same <IJS>pathname</IJS>, <IJS>query</IJS>, and <IJS>hash</IJS>),
                then the current location will be replaced. If you attempt to
                navigate to a new location, it will be pushed.
              </p>
              <p>
                Unless you have a reason to explicitly push/replace, anchor
                navigation is what you should use for navigation.
              </p>
            </Explanation>
            <CodeBlock data-line="8,18,25,27">
              {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2

history.navigate("/three")

// same location, so nothing changes
locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2

history.navigate("/four")

// new location is pushed
locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" },
  { pathname: "/four" }
]
index = 3`}
            </CodeBlock>
          </Subsection>
        </Subsection>

        <Subsection title="Navigation with the Router" id="with-router">
          <Explanation>
            <p>
              In the above examples, navigation is done using URL pathnames, but
              one of the principles of Curi is that you shouldn't have to write
              URLs yourself. To help with this, the router has its own{" "}
              <IJS>navigate()</IJS> method.
            </p>
            <p>
              <IJS>router.navigate()</IJS> takes an object with the{" "}
              <IJS>name</IJS> of the route to navigate to. If the route (or any
              of its ancestors) requires <IJS>params</IJS>, they should also be
              provided through the object.
            </p>
            <p>
              <IJS>query</IJS>, <IJS>hash</IJS>, and <IJS>state</IJS> properties
              can also be provided to pass any of those location details.
            </p>
            <p>
              <IJS>router.navigate()</IJS> does anchor style (<IJS>
                "ANCHOR"
              </IJS>) navigation by default, but if you want to do{" "}
              <IJS>"PUSH"</IJS>/<IJS>"REPLACE"</IJS> navigation, you can provide
              the type with the <IJS>method</IJS> property.
            </p>
          </Explanation>
          <CodeBlock>
            {`router.navigate({
  name: "User",
  params: { id: 1423 }
});

// replace the current location with the Login route
router.navigte({
  name: "Login",
  state: { next: "/profile" }
  method: "REPLACE"
});`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section title="Detecting Navigation" id="detecting-navigation">
        <Explanation>
          <p>
            The Curi router uses an observer pattern to call registered
            functions (called response handlers) when there is a new response.
            The main function for response handlers is to use the new response
            to render the application, but any other functionality (like
            logging) can also be performed.
          </p>
        </Explanation>

        <Subsection title="Response Handlers" id="response-handlers">
          <Explanation>
            <p>
              When response handlers are called, they are passed an object with
              three properties:{" "}
              <Link
                to="Package"
                params={{ package: "router" }}
                hash="properties"
              >
                <IJS>router</IJS>
              </Link>,{" "}
              <Link
                to="Guide"
                params={{ slug: "routes-and-responses" }}
                hash="responses"
              >
                <IJS>response</IJS>
              </Link>, and{" "}
              <Link to="Guide" params={{ slug: "navigation-objects" }}>
                <IJS>navigation</IJS>
              </Link>. Which objects/properties you use depends on what the
              response handler is doing.
            </p>
          </Explanation>
          <CodeBlock>
            {`function responseHandler({
  router,
  response,
  navigation
}) {
  // ...
}`}
          </CodeBlock>
        </Subsection>

        <Subsection title="Registering Response Handlers" id="registering">
          <Explanation>
            <p>
              There are two ways to attach response handlers to the router:{" "}
              <IJS>router.once()</IJS> and <IJS>router.observe()</IJS>. Response
              handlers registered with <IJS>router.once()</IJS> will only be
              called one time, while those registered with{" "}
              <IJS>router.observe()</IJS> will be called for every new response.
            </p>
            <p>
              When you register a response handler using{" "}
              <IJS>router.observer()</IJS>, it will return a function that you
              can use to stop calling the response handler for new responses.
              You should rarely need to do this, but it can be useful for memory
              management if you are adding and removing lots of observers.
            </p>
          </Explanation>
          <CodeBlock>
            {`// fn will only be called one time
router.once(fn);

// obs will be called for every new response
const stop = router.observer(fn);`}
          </CodeBlock>
        </Subsection>

        <Subsection title="Use Cases" id="use-cases">
          <p>What should you use response handlers for?</p>
          <Subsection title="Setup" id="setup">
            <Explanation>
              <p>
                If any of the routes in an application have <IJS>resolve</IJS>{" "}
                functions, when they match their responses are created
                asynchronously. When the application first renders, if the
                router matches an async route, the response isn't immediately
                ready to use. To deal with this, you can use an observer to
                render once the initial response is ready.
              </p>
              <p>
                A setup function only needs to be called one time, so you can
                register it with <IJS>router.once()</IJS>.
              </p>
              <Note>
                In most applications, waiting for the initial response is the
                only time you may need to write response handlers yourself.
              </Note>
            </Explanation>
            <CodeBlock lang="jsx">
              {`const Router = curiProvider(router);
              
function setup() {
  ReactDOM.render((
    <Router>
      {({ response }) => <response.body />}
    </Router>
  ), document.getElementById('root'));
}

router.once(setup);`}
            </CodeBlock>
          </Subsection>
          <Subsection title="Rendering" id="rendering">
            <Explanation>
              <p>
                Rendering libraries need to know when there is a new response so
                that they can re-render the application.
              </p>
              <p>
                The Curi rendering packages (<Link
                  to="Package"
                  params={{ package: "react-dom" }}
                >
                  <IJS>@curi/react-dom</IJS>
                </Link>,{" "}
                <Link to="Package" params={{ package: "react-native" }}>
                  <IJS>@curi/react-native</IJS>
                </Link>,{" "}
                <Link to="Package" params={{ package: "vue" }}>
                  <IJS>@curi/vue</IJS>
                </Link>, and{" "}
                <Link to="Package" params={{ package: "svelte" }}>
                  <IJS>@curi/svelte</IJS>
                </Link>) setup an observer internally so that they can
                automatically re-render.
              </p>
              <p>
                If you are using vanilla JavaScript to render your application
                or you are writing your own framework implementation, you would
                use <IJS>router.observer()</IJS> to re-render new responses.
              </p>
            </Explanation>
            <CodeBlock>
              {`function observer({ response }) {
  // let the app know there is a new response
}

router.observer(observer);`}
            </CodeBlock>
          </Subsection>
          <Subsection title="Side Effects" id="side-effects">
            <Explanation>
              <p>
                Side effects are observers that are provided to the router at
                creation instead of by calling <IJS>router.observe()</IJS>.
                These can be useful for tasks that are not rendering related as
                well as for tasks that need to be performed after a render has
                completed.
              </p>
              <p>
                The{" "}
                <Link to="Package" params={{ package: "side-effect-title" }}>
                  <IJS>@curi/side-effect-title</IJS>
                </Link>{" "}
                package provides a side effect that will use{" "}
                <IJS>response.title</IJS> to set the page's{" "}
                <IJS>document.title</IJS>.
              </p>
              <p>
                With single-page applications, clicking on links wish hashes
                won't always scroll to the matching element in the page. The{" "}
                <Link to="Package" params={{ package: "side-effect-scroll" }}>
                  <IJS>@curi/side-effect-scroll</IJS>
                </Link>{" "}
                package adds this behavior by scrolling the page to the element
                that matches the new response's hash (<IJS>
                  response.location.hash
                </IJS>) after the new response has rendered.
              </p>
              <p>
                If you need to add logging to your application, you could write
                your own observer to do this. Your observer can either be added
                as a side effect when the router is constructed or later using{" "}
                <IJS>router.observe()</IJS>.
              </p>
            </Explanation>
            <CodeBlock>
              {`function logger({ response }) {
  loggingAPI.add(response.location);
}

// as a side-effect
const router = curi(history, routes, {
  sideEffects: [{ fn: logger }]
});

// as an observer
router.observe(logger);`}
            </CodeBlock>
          </Subsection>
        </Subsection>
      </Section>
    </React.Fragment>
  );
}
