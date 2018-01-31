import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Section, Subsection } from "../components/Sections";
import { Note } from "../components/Messages";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      Curi aims to be easy to setup. The one thing that all Curi projects have
      in common is a router. You create a router by passing a Hickory history
      object and an array of route objects to the <IJS>curi</IJS> function (the
      default export from <IJS>@curi/core</IJS>.
    </p>
    <p>
      In order to re-render your application after navigation, you can observe
      your router for responses using its <IJS>respond</IJS> method.{" "}
      <IJS>respond</IJS> takes a callback function that will be passed{" "}
      <IJS>response</IJS> and <IJS>navigation</IJS> arguments, which you can use
      to render.
    </p>

    <Section title="The History Object" id="history-object">
      <p>
        Curi's navigation is powered by the{" "}
        <a href="https://github.com/pshrmn/hickory">Hickory</a> package. You
        just need to pick which type of Hickory history object is right for your
        application.
      </p>
      <PrismBlock lang="javascript">
        {`// Use Browser when your website has a dynamic server
import Browser from '@hickory/browser';
const browserHistory = Browser();

// Use Hash when your website uses a static file server
import Hash from '@hickory/hash';
const hashHistory = Hash();

// Use InMemory when your application doesn't run in a browser
import InMemory from '@hickory/in-memory';
const memoryHistory = InMemory();`}
      </PrismBlock>

      <p>
        Each history object has essentially the same API (InMemory has a few
        extra properties). The most important properties to know are the
        location object as well as the navigate, push, and replace methods.
      </p>

      <p />

      <PrismBlock lang="javascript">
        {`// the location property is the current location object
browserHistory.location === {
  pathname: '/guides/getting-started',
  ...
};

// the push method will navigate to a new location
browserHistory.push({ pathname: '/guides/installation' });

// the replace method will replace the current location
// with the provided one
browserHistory.push({ pathname: '/guides/confirming-navigation' });

// the navigate method will choose whether to push or replace for you
// this behavior mimics how anchors (<a>) navigate
browserHistory.navigate({ pathname: '/guides/getting-started' });
`}
      </PrismBlock>
    </Section>

    <Section title="The Routes Array" id="routes-array">
      <p>Routes are objects with two required properties: name and path.</p>
      <p>
        Paths can be any valid{" "}
        <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a>{" "}
        string. It is just important that you do not begin the string with a
        forward slash (/). Forward slashes are fine anywhere else in the path. (<IJS
        >
          this/is/fine
        </IJS>, but <IJS>/this/is/not</IJS>).
      </p>
      <p>
        The names are used to generate URIs for you. With Curi, you never have
        to write a URI's pathname string yourself. It is required that all of
        your routes have unique names. This is because Curi generates location
        pathnames using route names (and params for non-static paths).
      </p>
      <PrismBlock lang="javascript">
        {`const routes = [
  {
    name: 'Home',
    path: '', // matches the pathname /
    ...
  },
  ...
]`}
      </PrismBlock>
      <p>
        How route matching works and the other route properties are explained
        more in-depth in the{" "}
        <Link to="Guide" params={{ slug: "routes" }}>
          All About Routes
        </Link>{" "}
        guide.
      </p>
    </Section>

    <Section title="The router" id="router-object">
      <p>
        Once you have your Hickory history object and your routes array, you
        just need to pass them to the default export from the Curi package
        (which we will name <IJS>curi</IJS> here).
      </p>
      <PrismBlock lang="javascript">
        {`import curi from 'curi';
import Browser from '@hickory/browser';
import routes from './routes';

const history = Browser();
const router = curi(history, routes);
`}
      </PrismBlock>

      <Subsection title="Other router options" id="other-router-options">
        <p>
          The <IJS>curi</IJS> function can also take an optional third argument,
          which is an options object. You can use this to pass{" "}
          <Link to="Guide" params={{ slug: "addons" }}>
            add-ons
          </Link>,{" "}
          <Link to="Guide" params={{ slug: "side-effects" }}>
            side effects
          </Link>, a{" "}
          <Link to="Guide" params={{ slug: "response-caching" }}>
            cache
          </Link>, and a{" "}
          <a href="https://github.com/pillarjs/path-to-regexp#compile-reverse-path-to-regexp">
            <IJS>pathnameOptions</IJS>
          </a>{" "}
          object to your router.
        </p>
        <PrismBlock lang="javascript">
          {`const router = curi(history, routes, {
  addons: [...],
  sideEffects: [...],
  cache: cacheObject,
  pathnameOptions: { encode: x => x }
});`}
        </PrismBlock>
      </Subsection>
    </Section>

    <Section title="Responses">
      <p>
        Whenever navigation happens, a new location object is created by
        Hickory. Curi uses that location object's pathname property to match
        against all of your routes. When it finds one that matches, it uses that
        route object to create a response object. You can give your Curi router
        response handlers to be called whenever a new response is created. When
        a new response is created, your response handler function will be passed
        an object that contains a response object, an object with additional
        navigation data, and your router.
      </p>
      <Note>
        Response handlers are passed the router so you can define them in a
        separate module from the <IJS>router.respond</IJS> call and still
        reference the router.
      </Note>
      <PrismBlock lang="javascript">
        {`const router = curi(history, routes);
router.respond(({ response, navigation, router }) => {
  // whenever the location changes, this function is called
  // you can use this function to re-render your application
  // using the new response object
});
`}
      </PrismBlock>

      <p>
        Responses are generated asynchronously. A Curi router has a{" "}
        <IJS>respond</IJS> function that you can use to register a response
        handler function, which will be called whenever a new response is
        generated.
      </p>
      <PrismBlock lang="javascript">
        {`const router = curi(history, routes);
// wait to render until a response is generated
router.respond(({ response, navigation, router }) => {
  // now we can render using the response,
  // navigation, and router
});`}
      </PrismBlock>
      <p>
        Your rendering will be centered around these response objects, so you
        should be familiar with the different properties that will be available
        to you. We will get into more details about responses in the{" "}
        <Link to="Guide" params={{ slug: "responses" }}>
          Rendering with Responses
        </Link>{" "}
        guide, but for now we will just go over how a route maps to a response.
      </p>
      <PrismBlock lang="javascript">
        {`// if you have the following routes
const routes = [
  ...,
  {
    name: 'Album',
    path: 'photos/:albumID',
    ...,
    children: [
      {
        name: 'Photo',
        path: ':photoID',
        match: {
          response: ({ set }) => {
            set.body(Photo);
          }
        }
      }
    ]
  }
];
// when the user visits the URI /photos/6789/12345
// the following response object would be created:

{
  // The location key
  key: '1.0',

  // The location object used to generate the response.
  location: { pathname: '/photos/6789/12345', ... },

  // The value returned by the route's body function
  body: Photo,

  // The name of the best matching route
  name: 'Photo',

  // The name of ancestor routes that matched
  // part of the location's pathname
  partials: ['Album'],

  // An object containing the values parsed
  // from the pathname by path-to-regexp.
  params: { photoID: 12345, albumID: 6789 },

  // There are a few more properties as well. Please read
  // the Rendering with Responses guide to see those
}`}
      </PrismBlock>
    </Section>

    <h2>Next</h2>
    <p>
      Now that you know the core of how Curi works, let's take a closer look at
      routes with the{" "}
      <Link to="Guide" params={{ slug: "routes" }}>
        All About Routes
      </Link>{" "}
      guide.
    </p>
  </BaseGuide>
);
