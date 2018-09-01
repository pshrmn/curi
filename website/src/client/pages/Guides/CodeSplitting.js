import React from "react";
import { Link } from "@curi/react-dom";

import BaseGuide from "./base/BaseGuide";
import { InlineJS as IJS, PrismBlock } from "../../components/PrismBlocks";
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
          If you are bundling an application with a lot of routes, users of your
          application may be downloading a lot of unnecessary content for the
          initial page render. Using code splitting, you can reduce the initial
          download size for your application by splitting code that is
          conditionally loaded into a separate bundle that is only downloaded
          when it is needed.
        </p>

        <Note>
          This guide assumes that you are using Webpack 2+ to bundle your
          application.
        </Note>
      </Explanation>
    </SideBySide>

    <Section title="An app without code splitting" id="no-split">
      <SideBySide>
        <Explanation>
          <p>
            Let's start out by describing our application's routes without code
            splitting. We will import each route's component from the files
            where they are defined.
          </p>
        </Explanation>
        <CodeBlock>
          {`import Home from './components/Home';
import Contact from './components/Contact';
import ContactMethod from './components/ContactMethod';

const routes = [
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
    name: 'Contact',
    path: 'contact',
    response: () => {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        response: () => {
          return {
            body: ContactMethod
          };
        }
      }
    ]
  }
];`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="import() in resolve" id="import">
      <SideBySide>
        <Explanation>
          <p>
            Instead of having static imports, we will use the{" "}
            <IJS>import()</IJS> function to import our modules. We will import
            our components by adding a property to a route's <IJS>resolve</IJS>{" "}
            object. The property name for the function is how we will access the
            resolved data in the route's <IJS>response()</IJS> function.
          </p>
          <p>
            <IJS>resolve</IJS> functions are called every time a route matches.
            However, <IJS>import()</IJS> calls automatically re-use the results
            of a previous call, so we do not have to worry about extra network
            requests.
          </p>
          <p>
            Here we will name the <IJS>resolve</IJS> function for importing a
            component <IJS>body</IJS>, since it will be set as the response's{" "}
            <IJS>body</IJS> property.
          </p>
          <p>
            <IJS>resolve.body()</IJS> should return a Promise;{" "}
            <IJS>import()</IJS>, conveniently, returns a Promise. In our{" "}
            <IJS>response()</IJS> function, instead of referencing values
            imported at the top of the file, we can reference the result of the{" "}
            <IJS>resolve.body()</IJS> function using <IJS>resolved.body</IJS>.
          </p>
          <p>
            <IJS>import()</IJS> resolves with a module object. If the component
            is a default export (<IJS>export default MyComponent</IJS>), we can
            access the component through the imported module object's{" "}
            <IJS>default</IJS> property.
          </p>
        </Explanation>
        <CodeBlock>
          {`const routes = [
  {
    name: 'Home',
    path: '',
    resolve: {
      body: () => (
        import('./components/Home')
          .then(module => module.default)
      ),
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    resolve: {
      body: () => (
        import('./components/Contact')
          .then(module => module.default)
      ),
    },
    response: ({ resolved }) => {
      return {
        body: resolved.body
      };
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        resolve: {
          body: () => (
            import('./components/ContactMethod')
              .then(module => module.default)
          )
        },
        response: ({ resolved }) => {
          return {
            body: resolved.body
          };
        }
      }
    ]
  }
];`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="Other Approaches" id="other">
      <p>
        The approaches taken here are not the only way to do code splitting.
        Another approach is to skip the <IJS>resolve</IJS> method and do code
        splitting at other points in your application (e.g.{" "}
        <a href="https://github.com/jamiebuilds/react-loadable">
          <IJS>react-loadable</IJS>
        </a>).
      </p>
      <p>
        Whatever path you decide to go, hopefully this has shown you that
        setting up code splitting with a <IJS>resolve</IJS> function is fairly
        simple to do. If you are using Webpack and want to reduce your initial
        bundle size, <IJS>resolve</IJS> functions are a good way to accomplish
        this.
      </p>
    </Section>
  </BaseGuide>
);
