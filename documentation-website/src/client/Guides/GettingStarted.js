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
      This guide will cover a few basic concepts about Curi so that you can be
      confident integrating Curi into your application.
    </p>

    <Section title="The router" id="router-object">
      <p>
        A Curi router is created using a <IJS>history</IJS> object and a{" "}
        <IJS>routes</IJS> array. You create the router by calling the{" "}
        <IJS>curi</IJS> function, which is the default export from the{" "}
        <IJS>@curi/core</IJS> package.
      </p>
      <PrismBlock lang="javascript">
        {`npm install @curi/core
        
import curi from '@curi/core';
import Browser from '@hickory/browser';
import routes from './routes';

const history = Browser();
const router = curi(history, routes);
`}
      </PrismBlock>
      <Note>
        This function also accepts an <IJS>options</IJS> object. You can read
        about its properties in the{" "}
        <Link
          to="Package"
          params={{ package: "core" }}
          details={{ hash: "options" }}
        >
          <IJS>@curi/core</IJS>
        </Link>{" "}
        documentation.
      </Note>
    </Section>

    <Section title="The History Object" id="history-object">
      <p>
        The most important function of a router is to keep track of locations.
        Curi does this using <IJS>history</IJS> objects created by your choice
        of one of the <a href="https://github.com/pshrmn/hickory">Hickory</a>{" "}
        packages. Which Hickory package you choose depends mostly on where your
        application will be running.
      </p>
      <Subsection title="Browser" id="hickory-browser">
        <p>
          If you are building a website that will be hosted on a dynamic server
          (it can respond to requests for any location), you should use the{" "}
          <IJS>@hickory/browser</IJS> package.
        </p>
        <PrismBlock lang="javascript">
          {`npm install @hickory/browser
          
import Browser from '@hickory/browser';
const browserHistory = Browser();`}
        </PrismBlock>
      </Subsection>
      <Subsection title="Hash" id="hickory-hash">
        <p>
          If you are building a website that will be hosted on a static file
          server, you will need to use the <IJS>@hickory/hash</IJS> package. The
          paths for your routes will be encoded in the <IJS>hash</IJS> section
          of the URL. This isn't as "pretty" as the paths you get with{" "}
          <IJS>@hickory/browser</IJS>, but is a necessary solution for
          statically hosted websites.
        </p>
        <PrismBlock lang="javascript">
          {`npm install @hickory/hash
          
import Hash from '@hickory/hash';
const hashHistory = Hash();`}
        </PrismBlock>
      </Subsection>
      <Subsection title="In Memory" id="hickory-in-memory">
        <p>
          If your application is not running in a browser, you should use an
          in-memory history. This is what you would use when building a mobile
          application with React Native, writing a NodeJS backend for your
          server, or when writing tests that run in NodeJS.
        </p>
        <PrismBlock lang="javascript">
          {`npm install @hickory/in-memory

import InMemory from '@hickory/in-memory';
const memoryHistory = InMemory();`}
        </PrismBlock>
      </Subsection>
      <Subsection title="Properties and Methods" id="props-and-methods">
        <p>
          Each history object has essentially the same API (<IJS>InMemory</IJS>{" "}
          has a few extra properties). The most important properties to know are
          the <IJS>location</IJS> object as well as the <IJS>navigate</IJS>,{" "}
          <IJS>push</IJS>, and <IJS>replace</IJS> methods.
        </p>

        <PrismBlock lang="javascript">
          {`// the location property is the current location object
browserHistory.location === {
  pathname: '/guides/getting-started',
  ...
};

// the push method will navigate to a new location
browserHistory.push({
  pathname: '/guides/installation'
});

// the replace method will replace the current location
// with the provided one
browserHistory.replace({
  pathname: '/guides/confirming-navigation'
});

// the navigate method will choose whether to push or replace for you
// this behavior mimics how anchors (<a>) navigate
browserHistory.navigate({
  pathname: '/guides/getting-started'
});`}
        </PrismBlock>
      </Subsection>
    </Section>

    <Section title="The Routes Array" id="routes-array">
      <p>
        Routes are objects with two required properties: a <IJS>name</IJS>{" "}
        string and a <IJS>path</IJS> string.
      </p>
      <Note>
        Paths can be any valid{" "}
        <a href="https://github.com/pillarjs/path-to-regexp">path-to-regexp</a>{" "}
        string. It is just important that you do not begin the string with a
        forward slash (/). Forward slashes are fine anywhere else in the path. (<IJS
        >
          this/is/fine
        </IJS>, but <IJS>/this/is/not</IJS>).
      </Note>
      <p>
        Route names are used to generate pathnames for you. With Curi, you never
        have to write a pathname string yourself. This also means that all
        routes must have unique names.
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

    <Section title="Responses">
      <p>
        Whenever navigation happens, Curi will create a <IJS>response</IJS>{" "}
        object, which provides data based on the route that it matched. The
        router's <IJS>respond</IJS> method is used to register callback
        functions (called response handlers), which the router will call when a
        new response is created.
      </p>
      <p>
        Response handlers will be passed an object with three properties:{" "}
        <IJS>response</IJS>, <IJS>navigation</IJS>, and <IJS>router</IJS>.
      </p>
      <PrismBlock lang="javascript">
        {`function responseHandler(({ response, navigation, router }) {
  // response - contains data about the matching route
  // navigation - contains data about the location change
  // router - your router, useful if you want to define this
  //   in a separate module 
});`}
      </PrismBlock>
      <p>
        There are two types of response handlers, one time functions and
        observers.
      </p>
      <p>
        One time functions will be called one time, either immediately if a
        response already exist, or once the router's initial <IJS>response</IJS>{" "}
        is created. These are useful for setup functions in your application.
      </p>
      <PrismBlock lang="javascript">
        {`router.respond(() => {
  // I will only be called once
});`}
      </PrismBlock>
      <p>
        Observers will be called every time a response is created. These are
        great for triggering re-renders, although the render packages (<Link
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
        </Link>) handle this for you, so you likely won't need to use these
        manually.
      </p>
      <PrismBlock lang="javascript">
        {`const stopObserving = router.respond(() => {
  // I will be called for every new response until the
  // stopObserving function is called
}, { observe: true });`}
      </PrismBlock>
    </Section>

    <h2>Next</h2>
    <p>
      Rendering your application will be centered around these response objects.
      The{" "}
      <Link to="Guide" params={{ slug: "responses" }}>
        Response Handlers
      </Link>{" "}
      guide will go into more detail about their properties, but first we should
      take a look at how to write routes with the{" "}
      <Link to="Guide" params={{ slug: "routes" }}>
        All About Routes
      </Link>{" "}
      guide.
    </p>
  </BaseGuide>
);
