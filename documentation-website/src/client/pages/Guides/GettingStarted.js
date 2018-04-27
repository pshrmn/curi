import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
import { Section, Subsection } from "../../components/Sections";
import { Note } from "../../components/Messages";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>There are a few concepts that you should know about Curi.</p>

    <Section title="The Router" id="router-object">
      <p>
        A Curi router is created using the default export function from the{" "}
        <IJS>@curi/core</IJS> package. This function takes a <IJS>history</IJS>{" "}
        object and a <IJS>routes</IJS> array.
      </p>
      <PrismBlock lang="javascript">
        {`import curi from '@curi/core';
import Browser from '@hickory/browser';
import routes from './routes';

const history = Browser();
const router = curi(history, routes);`}
      </PrismBlock>
      <Note>
        This function also accepts an <IJS>options</IJS> object. You can read
        about its properties in the{" "}
        <Link to="Package" params={{ package: "core" }} hash="options">
          <IJS>@curi/core</IJS>
        </Link>{" "}
        documentation.
      </Note>
    </Section>

    <Section title="The History Object" id="history-object">
      <p>
        A router facilitates navigation between locations. Curi does this using
        a <IJS>history</IJS> object, which comes from the{" "}
        <a href="https://github.com/pshrmn/hickory">Hickory</a> library. There
        are a few different types of history objects that you can make; which
        one you should use depends on where your application will be running and
        how you are serving the application.
      </p>
      <p>
        If you are unsure about how to serve a single-page application,{" "}
        <a href="https://medium.com/@pshrmn/single-page-applications-and-the-server-32a23d67936">
          this article
        </a>{" "}
        should help.
      </p>
      <ul>
        <li>
          <p>
            <strong>Browser History</strong> - If you are building a website
            that will be hosted on a server that can handle dynamic requests,
            you should use the <IJS>@hickory/browser</IJS> package.
          </p>
          <PrismBlock lang="bash">{`npm install @hickory/browser`}</PrismBlock>
          <PrismBlock lang="javascript">
            {`import Browser from '@hickory/browser';
const browserHistory = Browser();`}
          </PrismBlock>
        </li>
        <li>
          <p>
            <strong>Hash History</strong> - If you are building a website that
            will be hosted on a static file host, you will need to use the{" "}
            <IJS>@hickory/hash</IJS> package. The paths for your routes will be
            encoded in the <IJS>hash</IJS> section of the URL. This isn't as
            "pretty" as the paths you get with <IJS>@hickory/browser</IJS>, but
            is a necessary solution for statically hosted websites.
          </p>
          <PrismBlock lang="bash">{`npm install @hickory/hash`}</PrismBlock>
          <PrismBlock lang="javascript">
            {`import Hash from '@hickory/hash';
const hashHistory = Hash();`}
          </PrismBlock>
        </li>
        <li>
          <p>
            <strong>In Memory History</strong> - If your application is not
            running in a browser, you should use an in-memory history. This is
            what you would use when building a mobile application with React
            Native, writing a NodeJS backend for your server, or when writing
            tests that run in NodeJS.
          </p>
          <PrismBlock lang="bash">
            {`npm install @hickory/in-memory`}
          </PrismBlock>
          <PrismBlock lang="javascript">
            {`import InMemory from '@hickory/in-memory';
const memoryHistory = InMemory();`}
          </PrismBlock>
        </li>
      </ul>
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
        forward slash (<IJS>/</IJS>). Forward slashes are fine anywhere else in
        the path. (<IJS>this/is/fine</IJS>, but <IJS>/this/is/not</IJS>).
      </Note>
      <PrismBlock lang="javascript">
        {`const routes = [
  {
    name: 'Home',
    path: '', // matches  '/'
    // ...
  },
  // ...
]`}
      </PrismBlock>
      <p>
        Curi creates URLs for you; you just need to know the name of the route
        to link to. This means that all routes must have unique names.
      </p>
      <PrismBlock lang="javascript">
        {`router.navigate({ name: "Home" }); // navigates to "/"`}
      </PrismBlock>
      <p>
        The{" "}
        <Link to="Guide" params={{ slug: "routes" }}>
          All About Routes
        </Link>{" "}
        guide provides a more in-depth explanation of how route matching works
        and the other route properties.
      </p>
    </Section>

    <Section title="Responses">
      <p>
        Whenever the user navigates in the app, Curi will create a{" "}
        <IJS>response</IJS> object, which provides data about the route that it
        matched. The property values of the response object can be modified
        through the matching route's <IJS>response()</IJS> function.
      </p>
      <p>
        The response object is used to render your application. The response's{" "}
        <IJS>body</IJS> property provides a convenient way to specify what you
        should render.
      </p>
      <PrismBlock lang="jsx">
        {`// React
import Home from './components/Home';

const routes = [
  {
    name: 'Home',
    path: '',
    response() {
      // set response.body to be the imported
      // Home component
      return {
        body: Home
      };
    }
  }
];

ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      // when response.body === Home, this is the same as <Home />
      return <response.body />;
    }}
  </CuriProvider>
), document.getElementById('root'));`}
      </PrismBlock>
    </Section>

    <h2>Next</h2>
    <p>
      Curi can match routes synchronously or asynchronously. The{" "}
      <Link to="Guide" params={{ slug: "sync-or-async" }}>
        Sync or Async Guide
      </Link>{" "}
      covers how this works and what it means for your application.
    </p>
  </BaseGuide>
);
