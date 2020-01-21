import React from "react";

import {
  TitledPlainSection,
  HashSection,
  CodeBlock,
  Note,
  IJS
} from "../../components/guide/common";

let meta = {
  title: "Code Splitting"
};

let noSplitMeta = {
  title: "An app without code splitting",
  hash: "no-split"
};
let importMeta = {
  title: "import() in resolve",
  hash: "import"
};
let otherMeta = {
  title: "Other Approaches",
  hash: "other"
};

let contents = [noSplitMeta, importMeta, otherMeta];

function CodeSplittingGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title}>
        <p>
          If you are bundling an application with a lot of routes, users of your
          application may be downloading a lot of unnecessary content for the
          initial page render. Using code splitting, you can reduce the initial
          download size for your application by splitting code that is
          conditionally loaded into a separate bundle that is only downloaded
          when it is needed.
        </p>

        <Note>
          <p>
            This guide assumes that you are using Webpack 2+ to bundle your
            application.
          </p>
        </Note>
      </TitledPlainSection>

      <HashSection meta={noSplitMeta} tag="h2">
        <p>
          Let's start out by describing our application's routes without code
          splitting. We will import each route's component from the files where
          they are defined.
        </p>

        <CodeBlock>
          {`import Home from './components/Home';
import Contact from './components/Contact';
import ContactMethod from './components/ContactMethod';

let routes = prepareRoutes([
  {
    name: 'Home',
    path: '',
    respond: () => {
      return {
        body: Home
      };
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    respond: () => {
      return {
        body: Contact
      };
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        respond: () => {
          return {
            body: ContactMethod
          };
        }
      }
    ]
  }
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={importMeta} tag="h2">
        <p>
          Instead of having static imports, we will use the dynamic{" "}
          <IJS>import</IJS> function to import our modules. We will import our
          components using a route's <IJS>resolve</IJS> object.
        </p>

        <p>
          A route's <IJS>resolve</IJS> function is called every time it matches.
          However, <IJS>import</IJS> calls automatically re-use the results of a
          previous call, so we do not have to worry about extra network
          requests.
        </p>

        <p>
          A route's <IJS>resolve</IJS> function should return a Promise;{" "}
          <IJS>import</IJS>, conveniently, returns a Promise. In our{" "}
          <IJS>respond</IJS> function, instead of referencing values imported at
          the top of the file, we can reference the result of the{" "}
          <IJS>resolve</IJS> function using the <IJS>resolved</IJS> property
          passed to the <IJS>respond</IJS> function.
        </p>

        <p>
          <IJS>import</IJS> resolves with a module object. If the component is a
          default export (<IJS>export default MyComponent</IJS>), we can access
          the component through the imported module object's <IJS>default</IJS>{" "}
          property.
        </p>

        <CodeBlock>
          {`let routes = prepareRoutes([
  {
    name: 'Home',
    path: '',
    resolve() {
      return import('./components/Home')
        .then(module => module.default);
    },
    respond: ({ resolved }) => {
      return {
        body: resolved
      };
    }
  },
  {
    name: 'Contact',
    path: 'contact',
    resolve() {
      return import('./components/Contact')
        .then(module => module.default);
    },
    respond: ({ resolved }) => {
      return {
        body: resolved
      };
    },
    children: [
      {
        name: 'Contact Method',
        path: ':method',
        resolve() {
          return import('./components/ContactMethod')
            .then(module => module.default);
        },
        respond: ({ resolved }) => {
          return {
            body: resolved
          };
        }
      }
    ]
  }
]);`}
        </CodeBlock>
      </HashSection>

      <HashSection meta={otherMeta} tag="h2">
        <p>
          The approaches taken here are not the only way to do code splitting.
          Another approach is to skip the <IJS>resolve</IJS> method and do code
          splitting at other points in your application (e.g.
          <a href="https://reactjs.org/docs/react-api.html#reactlazy">
            <IJS>React.lazy</IJS>
          </a>
          ).
        </p>
        <p>
          Whatever path you decide to go, hopefully this has shown you that
          setting up code splitting with a <IJS>resolve</IJS> function is fairly
          simple to do. If you are using Webpack and want to reduce your initial
          bundle size, using dynamic <IJS>import</IJS> calls in a{" "}
          <IJS>resolve</IJS> functions is a good way to accomplish this.
        </p>
      </HashSection>
    </React.Fragment>
  );
}

export { CodeSplittingGuide as component, contents };
