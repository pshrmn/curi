import React from "react";
import { Link } from "@curi/react";

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

    <Section title="import() in on.initial()" id="initial">
      <SideBySide>
        <Explanation>
          <p>
            Instead of having static imports, we will use the{" "}
            <IJS>import()</IJS> function to import our modules. We will import
            our components using the <IJS>on.initial()</IJS> property of routes.
            This function will only be called the first time that its route
            matches, so we don't have to worry about making extra requests to
            our server.
          </p>

          <p>
            <IJS>on.initial()</IJS> should be a function that returns a Promise;{" "}
            <IJS>import()</IJS>, conveniently, returns a Promise. Then, in our{" "}
            <IJS>response()</IJS> function, instead of referencing values
            imported at the top of the file, we can reference the result of the{" "}
            <IJS>initial</IJS> function using <IJS>resolved.initial</IJS>.
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
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    },
    on: {
      initial: () => (
        import('./components/Home')
          .then(module => module.default)
      ),
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    response: ({ resolved }) => {
      return {
        body: resolved.initial
      };
    },
    on: {
      initial: () => (
        import('./components/Contact')
          .then(module => module.default)
      ),
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        response: ({ resolved }) => {
          return {
            body: resolved.initial
          };
        },
        on: {
          initial: () => (
            import('./components/ContactMethod')
              .then(module => module.default)
          )
        }
      }
    ]
  }
];`}
        </CodeBlock>
      </SideBySide>
    </Section>

    <Section title="Next" id="next">
      <p>
        The approaches taken here are not the only way to do code splitting. You
        may choose to skip the <IJS>on.initial()</IJS> method and do code
        splitting at other points in your application.
      </p>
      <p>
        Whatever path you decide to go, hopefully this has shown you that
        setting up code splitting with the <IJS>on.initial()</IJS> property is
        fairly simple to do. If you are using Webpack and want to reduce your
        initial bundle size, <IJS>on.initial()</IJS> is a good way to accomplish
        this.
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
