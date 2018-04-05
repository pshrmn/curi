import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default () => (
  <BaseTutorial>
    <h1>Part 3: The Router</h1>
    <p>
      One thing that all modern JavaScript routers have in common is that they
      use the{" "}
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
        History API
      </a>{" "}
      to perform in-app navigation. Curi uses a package called{" "}
      <a href="https://github.com/pshrmn/hickory">Hickory</a>, which will
      interact with the History API for us.
    </p>
    <p>
      We need to figure out how to get our website to use the History API and
      then we will be ready to create the router.
    </p>
    <Outline>
      <ul>
        <li>Learning about the Hickory package and location objects.</li>
        <li>Creating the Hickory history object for our website.</li>
        <li>Creating our router using our routes and history object.</li>
      </ul>
    </Outline>
    <TutorialBranch name="03-hickory" />
    <Section title="Hickory and History" id="hickory">
      <p>
        <a href="https://github.com/pshrmn/hickory">Hickory</a> is JavaScript
        library that is used to create "history" objects. These history objects
        allow you to navigate between locations within your application. A
        history object interacts with the browser using the native History API
        so that when you navigate to a new location, the URI in the address bar
        is also updated. Hickory also detects and updates when you use the
        browser's forward and back buttons.
      </p>
      <p>
        Curi integrates with Hickory to automatically create new responses
        whenever the location changes.
      </p>
      <Note>
        Hickory is split into three packages: <IJS>@hickory/browser</IJS>,{" "}
        <IJS>@hickory/hash</IJS>, and <IJS>@hickory/in-memory</IJS>. You can
        read about the differences between them in this{" "}
        <a href="https://github.com/pshrmn/hickory/blob/master/docs/about/choosing.md">
          Choosing Your History Type
        </a>{" "}
        guide. We will be using the browser history (<IJS>@hickory/browser</IJS>).
      </Note>
      <Subsection title="Installation" id="hickory-installation">
        <p>
          If you have following along with these tutorials since the{" "}
          <Link to="Tutorial" params={{ name: "01-setup" }}>
            setup tutorial
          </Link>, then you should already have the <IJS>@hickory/browser</IJS>{" "}
          package installed. If not, you should install it now.
        </p>
        <PrismBlock lang="bash">{`npm install @hickory/browser`}</PrismBlock>
      </Subsection>
      <Subsection title="Making History" id="making-history">
        <p>
          In order to use Hickory in our application, we just need to import it
          and call the imported function.
        </p>
        <Note>
          There are a number of configuration options that you can provide when
          creating a history object. If you want to learn more about those,
          please check out the{" "}
          <a href="https://github.com/pshrmn/hickory/tree/master/docs">
            Hickory documentation
          </a>.
        </Note>
        <PrismBlock lang="javascript">
          {`// index.js
import Browser from '@hickory/browser';
const history = Browser();`}
        </PrismBlock>
      </Subsection>
    </Section>
    <Section title="Location" id="hickory-location" type="aside">
      <p>
        Hickory (and Curi in turn) use location objects for navigation and route
        matching. These are simply JavaScript objects with a few properties to
        identify a location.
      </p>
      <p>
        When you load a page, Hickory will parse the URI to generate a
        location's <IJS>pathname</IJS>, <IJS>query</IJS>, and <IJS>hash</IJS>{" "}
        properties. The pathname property of a location is what{" "}
        <IJS>path-to-regexp</IJS> uses for matching routes.
      </p>
      <PrismBlock lang="javascript">
        {`// uri = '/products/socks?color=black#description'
{
 pathname: '/products/socks',
 query: 'color=black',
 hash: 'description',
 key: '1.0',
 rawPathname: '/products/socks'
}`}
      </PrismBlock>
      <p>
        Besides the properties parsed from the URI, locations also have a{" "}
        <IJS>key</IJS> property that can be used to uniquely identify a
        location, a <IJS>rawPathname</IJS> property (you probably won't need
        this, but it is useful when dealing with pathnames that contain encoded
        characters), and sometimes <IJS>state</IJS> which is data tied to a
        location but not part of the URI.
      </p>

      <p>
        Hickory actually navigates between locations, not URIs. The only time
        that Curi/Hickory uses URIs is to set the <IJS>href</IJS> attribute of
        anchor elements and to update the string displayed in the address bar
        (using the browser's native History API).
      </p>
    </Section>
    <Section title="The Router" id="router">
      <Subsection title="Installation" id="curi-installation">
        <p>
          If you skipped the setup, you should install <IJS>@curi/core</IJS>{" "}
          now.
        </p>
        <PrismBlock lang="bash">{`npm install @curi/core`}</PrismBlock>
      </Subsection>
      <Subsection title="Creating our router" id="create">
        <p>
          <IJS>@curi/core</IJS> only has a single, default export, which is a
          function that will create a router. In this tutorial, we will import
          it as <IJS>curi</IJS>.
        </p>
        <PrismBlock lang="javascript">
          {`import curi from '@curi/core';`}
        </PrismBlock>
        <p>
          <IJS>curi</IJS> can take three arguments; the first two arguments are
          required while the third is not.
        </p>
        <ol>
          <li>
            <IJS>history</IJS> - The first argument to pass to <IJS>curi</IJS>{" "}
            is a Hickory history object.
          </li>
          <li>
            <IJS>routes</IJS> - The second argument is an array of route
            objects.
          </li>
          <li>
            <IJS>options</IJS> - The third argument is an object that contains
            additional configuration options. We will not be using this object
            in this tutorial.
          </li>
        </ol>
        <p>
          Using the routes that we defined in the{" "}
          <Link to="Tutorial" params={{ name: "02-routes" }}>
            Routes Tutorial
          </Link>{" "}
          and the{" "}
          <Link to="Tutorial" params={{ name: "03-hickory" }}>
            Hickory history object
          </Link>, we are ready to create our router.
        </p>
        <PrismBlock lang="javascript">
          {`// index.js
import curi from '@curi/core';
import Browser from '@hickory/browser';

import routes from './routes';

const history = Browser();
const router = curi(history, routes);`}
        </PrismBlock>
      </Subsection>
    </Section>
    <Section title="Review" id="review">
      <p>This is where we will split off into React and Vue sections.</p>
      <CompleteBranch name="04-router" />
    </Section>
    <Section title="Next" id="next">
      <p>
        Now that we have a router, we are ready to render. We are at a bit of a
        fork in the road. While most of the tutorials apply to everyone, the
        next tutorial is framework specific.
      </p>
      <p>
        If you are following along using React, continue on to{" "}
        <Link to="Tutorial" params={{ name: "05-pages-react" }}>
          Part 5: React Pages
        </Link>
      </p>
      <p>
        If you are following along using Vue, you instead you should go to{" "}
        <Link to="Tutorial" params={{ name: "05-pages-vue" }}>
          Part 5: Vue Pages
        </Link>
      </p>
    </Section>
  </BaseTutorial>
);
