import React from "react";
import { Link } from "@curi/react";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../components/PrismBlocks";
import { Note } from "../components/Messages";
import { Section, Subsection } from "../components/Sections";

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>
    <p>
      If you are bundling an application with a lot of routes, users of your
      application may be downloading a lot of unnecessary content just to render
      the initial page. Using code splitting, you can reduce the initial
      download size for your application by splitting code that is conditionally
      loaded into a separate bundle that is only downloaded when it is needed.
    </p>

    <Note>
      This guide assumes that you are using Webpack 2+ to bundle your
      application.
    </Note>

    <Section title="An app without code splitting" id="no-split">
      <p>
        Let's start out by describing our application's routes without code
        splitting. We will import each route's component from the files where
        they are defined.
      </p>

      <PrismBlock lang="javascript">
        {`import Home from './components/Home';
import Contact from './components/Contact';
import ContactMethod from './components/ContactMethod';

const routes = [
  {
    name: 'Home',
    path: '',
    match: () => {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    match: () => {
      response: ({ set }) => {
        set.body(Contact);
      }
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        match: () => {
          response: ({ set }) => {
            set.body(ContactMethod);
          }
        }
      }
    ]
  }
];`}
      </PrismBlock>
    </Section>

    <Section title="import() in match.initial" id="initial">
      <p>
        Instead of having static imports, we will use the <IJS>import()</IJS>{" "}
        function to import our modules. We will import our components using the{" "}
        <IJS>match.initial</IJS> property of routes. This function will only be
        called the first time that its route matches, so we don't have to worry
        about making extra requests to our server.
      </p>

      <p>
        <IJS>match.initial</IJS> should be a function that returns a Promise;{" "}
        <IJS>import()</IJS>, conveniently, returns a Promise. Then, in our{" "}
        <IJS>match.response</IJS> function, instead of referencing values
        imported at the top of the file, we can reference the result of the{" "}
        <IJS>initial</IJS> function using <IJS>resolved.initial</IJS>.
      </p>
      <p>
        <IJS>import()</IJS> resolves with a module object, so we will just
        assume that the component are default imports and reference them as{" "}
        <IJS>resolved.initial.default</IJS>. Alternatively, we could just
        resolve the default value in our <IJS>match.initial</IJS> function.
      </p>

      <PrismBlock lang="javascript">
        {`const routes = [
  {
    name: 'Home',
    path: '',
    match: {
      initial: () => import('./components/Home'),
      response: ({ resolved, set }) => {
        set.body(resolved.initial.default);
      }
    },
    body: () => Home
  },
  {
    name: 'Contact',
    path: 'contact',
    match: {
      initial: () => import('./components/Contact'),
      response: ({ resolved, set }) => {
        set.body(resolved.initial.default);
      }
    },
    body: () => Contact,
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        match: {
          // we can resolve module.default in initial
          // instead of in response
          initial: () => import('./components/ContactMethod')
            .then(module => module.default),
            response: ({ resolved, set }) => {
            set.body(resolved.initial);
          }
        },
        body: () => ContactMethod
      }
    ]
  }
];`}
      </PrismBlock>
    </Section>

    <Section title="Next" id="next">
      <p>
        The approaches taken here are not the only way to do code splitting. You
        may choose to skip the <IJS>match.initial</IJS> method and do code
        splitting at other points in your application. Whatever path you decide
        to go, hopefully this has shown you that setting up code splitting with
        the <IJS>match.initial</IJS> property is fairly simple to do. If you are
        using Webpack and want to reduce your initial bundle size,{" "}
        <IJS>match.initial</IJS> is an easy way to accomplish this.
      </p>

      <p>
        Next, we will take a look at some related route properties in{" "}
        <Link to="Guide" params={{ slug: "loading" }}>
          the loading guide
        </Link>.
      </p>
    </Section>
  </BaseGuide>
);
