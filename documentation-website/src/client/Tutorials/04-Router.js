import React from "react";
import { Link } from "@curi/react";

import BaseTutorial from "./base/BaseTutorial";
import { TutorialBranch, CompleteBranch, Outline } from "./base/Branch";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default () => (
  <BaseTutorial>
    <h1>Part 4: The Curi Router</h1>
    <p>
      Curi uses a centralized router to handle routing. Essentially, whenever
      the location changes (and when your application first loads), the router
      will iterate over your routes to find one that matches the location. Then,
      it will use that route to generate a response object. This response
      contains a bunch of properties that are useful for rendering your
      application.
    </p>
    <Outline>
      <ul>
        <li>Creating a Curi router using our routes and history object.</li>
        <li>
          Learning about some of the properties of the router and how Curi
          works.
        </li>
      </ul>
    </Outline>
    <TutorialBranch name="04-router" />
    <Section title="Installation" id="installation" type="aside">
      <p>
        If you skipped the setup, you should install <IJS>@curi/core</IJS> now.
      </p>
      <PrismBlock lang="bash">{`npm install @curi/core`}</PrismBlock>
    </Section>
    <Section title="Creating our router" id="create">
      <p>
        <IJS>@curi/core</IJS> only has a single, default export, which is a
        function that will create a router. In this tutorial, we will import it
        as <IJS>curi</IJS> (of course, you can name it whatever you like).
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
          <IJS>history</IJS> - The first argument to pass to <IJS>curi</IJS> is
          a Hickory history object.
        </li>
        <li>
          <IJS>routes</IJS> - The second argument is an array of route objects.
        </li>
        <li>
          <IJS>options</IJS> - The third argument is an object that contains
          additional configuration options. We will not be using this object in
          this tutorial.
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
        {`// src/index.js
import curi from '@curi/core';
import Browser from '@hickory/browser';

import routes from './routes';

const history = Browser();
const router = curi(history, routes);`}
      </PrismBlock>
    </Section>

    <Section title="Subscriber Model" id="subscriber" type="aside">
      <p>
        In order to let your application know about location changes, Curi uses
        a subscriber model. Whenever a location change happens, Curi will create
        a new response and then emit this response to all of its subscribed
        functions. These subscribed functions are called response handlers since
        they handle the new respond. Using <IJS>router.respond</IJS>, we can
        give Curi a response handler to call when a new response has been
        created.
      </p>
      <p>
        What does a response handler function look like? It receives an object
        with three properties: <IJS>response</IJS>, <IJS>navigation</IJS>, and{" "}
        <IJS>router</IJS>. The <IJS>response</IJS> contains information about
        the route that matched the new location, the <IJS>navigation</IJS>{" "}
        contains navigation data that doesn't belong in a <IJS>response</IJS>,
        and the <IJS>router</IJS> is your Curi router.
      </p>
      <PrismBlock lang="javascript">
        {`function responseLogger({ response, navigation }) {
  console.log("RESPONSE:", response);
  console.log("NAVIGATION", navigation)
}
router.respond(responseLogger);`}
      </PrismBlock>
      <p>
        <IJS>curi.respond</IJS> will return a function that you can use to stop
        responding to new responses.
      </p>
      <PrismBlock lang="javascript">
        {`function responseLogger() {
  console.log("I will be called for every response until I unsubscribe");
}
const stopResponding = router.respond(responseLogger);
// any navigation that happens now will be logged
// ...
stopResponding();
// after unsubscribing, any new navigation will not be logged`}
      </PrismBlock>
      <p>
        By default, response handlers are subscribers (that is to say, they will
        be called every time a new response is generated). You might sometimes
        want to only call a response handler once. For example, a response
        handler might be a "ready" function that you only want called once you
        know that an initial response exists. To do that, you can use the second
        argument to <IJS>router.respond</IJS>, which is an <IJS>options</IJS>{" "}
        object. When the <IJS>once</IJS> object is <IJS>true</IJS>, then that
        response handler will only be called one time.
      </p>
      <PrismBlock lang="javascript">
        {`function responseLogger() {
  console.log("I will only be called once");
}
router.respond(responseLogger, { once: true });`}
      </PrismBlock>
    </Section>

    <Section title="Review" id="review">
      <p>If you are following the React path:</p>
      <CompleteBranch name="05-pages-react" />
      <p>If you are following the Vue path:</p>
      <CompleteBranch name="05-pages-vue" />
    </Section>
    <Section title="Next" id="next">
      <p>
        With our router created, we are finally ready to render. Now, we are at
        a bit of a fork in the road. While most of the tutorials apply to
        everyone, the next tutorial is framework specific.
      </p>
      <p>
        If you are following along using React, continue on to{" "}
        <Link to="Tutorial" params={{ name: "05-pages-react" }}>
          Part 6: React Pages
        </Link>
      </p>
      <p>
        If you are following along using Vue, you instead you should go to{" "}
        <Link to="Tutorial" params={{ name: "05-pages-vue" }}>
          Part 6: Vue Pages
        </Link>
      </p>
    </Section>
  </BaseTutorial>
);
