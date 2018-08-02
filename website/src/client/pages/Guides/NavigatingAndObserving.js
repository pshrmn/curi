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
    <Section title="Navigation" id="navigation">
      <SideBySide>
        <Explanation>
          <p>
            The history object that you provide when creating a router is
            responsible for tracking all navigation within your application.
            Navigation can be triggered a variety of ways.
          </p>
          <p>
            There first type is "external" navigation, meaning it comes from
            outside of the application. For a website, this would be navigating
            by entering a URL in the address bar or by pressing the browser's
            forward/back buttons.
          </p>
          <p>
            The second type of navigation is "internal", where you use code to
            navigate to a new location.
          </p>
          <p>
            This guide is only going to discuss how to perform internal
            navigation since that is the only type that you need to perform with
            code.
          </p>
        </Explanation>
        <CodeBlock>
          {`import Browser from "@hickory/browser";
import { curi } from "@curi/router";

import routes from "./routes";

// this history object is responsible for tracking navigation
const history = Browser();

const router = curi(history, routes);`}
        </CodeBlock>
      </SideBySide>
      <Subsection title="Navigation With History" id="with-history">
        <SideBySide>
          <Explanation>
            <p>
              Locations are stored in what is essentially an array (the exact
              mechanism varies by history type). An index is used to keep track
              of which location in the array is the current location.
            </p>
            <Note>
              With the browser and hash histories, you cannot actually access
              the array of locations/index because doing so could cause security
              issues.
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
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              There are three ways to change locations: popping, pushing, and
              replacing.
            </p>
          </Explanation>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              Popping means that you change the index to another (valid) index
              in the array. Popping is performed by specifying how many
              locations forward (positive numbers) or backward (negative
              numbers) you want to go. When you click a browser's back button,
              that is essentially popping by negative one.
            </p>
            <p>
              The history object's <IJS>go()</IJS> function is used for popping
              between locations.
            </p>
          </Explanation>
          <CodeBlock data-line="8,15">
            {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2

history.go(-2)

locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 0`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
          <Explanation>
            <p>
              Pushing adds a new location after the current location in the
              array. Pushing is destructive because if there were any locations
              after the current location, they are lost when you push a new
              location.
            </p>
            <p>
              The history object's <IJS>navigate()</IJS> method is used for
              pushing new locations. In order to ensure that a location is
              pushed, the <IJS>"PUSH"</IJS> argument should be passed to the
              method call.
            </p>
          </Explanation>
          <CodeBlock data-line="8,12,14">
            {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 0

history.navigate("/four", "PUSH")

locations = [
  { pathname: "/one" },
  { pathname: "/four" }
]
index = 1`}
          </CodeBlock>
        </SideBySide>

        <SideBySide>
          <Explanation>
            <p>
              Replacing replaces the location at the current index with a new
              location. When you replace the current location, it has no effect
              on locations after the current one.
            </p>
            <p>
              The history object's <IJS>navigate()</IJS> method is used for
              replacing locations. In order to ensure that a location is
              replaced, the <IJS>"REPLACE"</IJS> argument should be passed to
              the method call.
            </p>
          </Explanation>
          <CodeBlock data-line="8,13">
            {`locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/three" }
]
index = 2

history.navigate("/four", "REPLACE")

locations = [
  { pathname: "/one" },
  { pathname: "/two" },
  { pathname: "/four" }
]
index = 2`}
          </CodeBlock>
        </SideBySide>
        <SideBySide>
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
        </SideBySide>
      </Subsection>

      <Subsection title="Navigation with the Router" id="with-router">
        <SideBySide>
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
              of its ancestors) requires
              <IJS>params</IJS>, they should also be provided through the
              object.
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
        </SideBySide>
      </Subsection>
    </Section>

    <Section title="Detecting Navigation" id="detecting-navigation">
      <SideBySide>
        <Explanation>
          <p>
            The Curi router uses an observer pattern to let registered functions
            know when there is a new response. The registered functions can then
            do whatever they want with this information. The main function for
            observers is to use the new response to render the application, but
            other functionality (like logging) can also be performed with
            observers.
          </p>
        </Explanation>
      </SideBySide>

      <Subsection title="Observer Functions" id="observer">
        <SideBySide>
          <Explanation>
            <p>
              When observer functions are called, they are passed an object with
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
        </SideBySide>
      </Subsection>

      <Subsection title="Registering Observers" id="registering">
        <SideBySide>
          <Explanation>
            <p>
              Observer functions are provided to the router through its{" "}
              <IJS>respond()</IJS> function. By default, functions passed to{" "}
              <IJS>respond()</IJS> will only be called one time. However, we can
              pass a configuration object as <IJS>respond()</IJS>'s second
              argument and tell it to call the function for all responses.
            </p>
            <p>
              When registering a function to continuously observe, a function
              will be returned to let you stop observing. You should rarely need
              to do this, but it can be useful for memory management if you are
              adding and removing lots of observers.
            </p>
          </Explanation>
          <CodeBlock>
            {`// fn will only be called one time
router.respond(fn);

// obs will be called for every new response
const stop = router.respond(fn, { observe: true });`}
          </CodeBlock>
        </SideBySide>
      </Subsection>

      <Subsection title="Use Cases" id="use-cases">
        <p>What should you use observers for?</p>
        <Subsection title="Setup" id="setup">
          <SideBySide>
            <Explanation>
              <p>
                If any of the routes in an application have <IJS>match</IJS>{" "}
                functions, responses for them are creating asynchronously. When
                the application first renders, if the router matches an async
                route, the response isn't immediately ready to use. To deal with
                this, you can use an observer to render once the initial
                response is ready.
              </p>
              <p>
                A setup function only needs to be called once, so you can call{" "}
                <IJS>router.respond()</IJS> without any options.
              </p>
              <Note>
                In most applications, waiting for the initial response is the
                only time you may need to write observers yourself.
              </Note>
            </Explanation>
            <CodeBlock lang="jsx">
              {`function setup({ router }) {
  ReactDOM.render((
    <CuriProvider router={router}>
      {({ response }) => <response.body />}
    </CuriProvider>
  ), document.getElementById('root'));
}

router.respond(setup);`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
        <Subsection title="Rendering" id="rendering">
          <SideBySide>
            <Explanation>
              <p>
                Rendering libraries need to know when there is a new response so
                that they can re-render the application.
              </p>
              <p>
                The Curi rendering packages (<Link
                  to="Package"
                  params={{ package: "react" }}
                >
                  <IJS>@curi/react</IJS>
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
                or you are writing your own framework implementation,{" "}
                <IJS>router.respond()</IJS> with the{" "}
                <IJS>{`{ observe: true }`}</IJS> option is what you would use to
                re-render new responses.
              </p>
            </Explanation>
            <CodeBlock>
              {`function observer({ response }) {
  // let the app know there is a new response
}

router.respond(observer, { observe: true });`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
        <Subsection title="Side Effects" id="side-effects">
          <SideBySide>
            <Explanation>
              <p>
                Side effects are observers that are provided to the router at
                creation instead of by calling <IJS>router.respond()</IJS>.
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
                <IJS>router.respond()</IJS>.
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

// with respond
router.respond(logger, { observe: true });`}
            </CodeBlock>
          </SideBySide>
        </Subsection>
      </Subsection>
    </Section>
  </BaseGuide>
);
