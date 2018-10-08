import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Svelte"
};

export default function SvelteGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="Store Integration" id="store">
        <Explanation>
          <p>
            Curi relies on Svelte's store to interface with an application. By
            adding the <IJS>response</IJS> (plus the <IJS>router</IJS> and{" "}
            <IJS>navigation</IJS> objects) to the store, they are accessible
            throughout the application.
          </p>
          <p>
            <IJS>@curi/svelte</IJS> provides a function to link the router to
            the store. This sets up an{" "}
            <Link to="Guide" params={{ slug: "navigating" }} hash="observer">
              observer
            </Link>, so that whenever there is a new response, the parts of your
            application that use the response will be re-rendered.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import store from "svelte/store";
import { curiStore } from "@curi/svelte";

import router from "./router";

const store = new Store();
curiStore(router, store);`}
        </CodeBlock>

        <Subsection title="Rendering with the response" id="rendering-response">
          <Explanation>
            <p>
              Svelte allows you to render dynamic components using the{" "}
              <Cmp>svelte:component this</Cmp> syntax. If you set Svelte
              components as the <IJS>body</IJS> properties on your responses,
              you can combine <Cmp>svelte:component this</Cmp> and{" "}
              <IJS>response.body</IJS> to render the appropriate component for a{" "}
              <IJS>response</IJS>.
            </p>
            <p>
              A root component is a good place to perform general application
              layout, like menus, in addition to rendering the response's{" "}
              <IJS>body</IJS>.
            </p>
          </Explanation>
          <CodeBlock lang="html">
            {`<template>
  <header>
    <NavLinks />
  </header>
  <main>
    <svelte:component this={$curi.response.body} />
  </main>
</template>

<script>
  import NavLinks from "./NavLinks";
  export default {
    components: { NavLinks }
  };
</script>`}
          </CodeBlock>

          <Explanation>
            <p>
              If your routes use an object to attach multiple components to a
              response, splitting them apart in computed properties may give
              your templates a cleaner look.
            </p>
            <p>
              If you do attach multiple components to a response, please
              remember that you want every route to set the same <IJS>body</IJS>{" "}
              shape. Otherwise, you'll have to determine the shape and change
              how you render, which can quickly become messy.
            </p>
          </Explanation>
          <CodeBlock lang="html">
            {`<script>
const routes = [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: {
          main: HomeMain,
          menu: HomeMenu
        }
      }
    }
  },
  // ...
];
</script>

<template>
  <header>
    <svelte:component this={menu} />
  </header>
  <main>
  <svelte:component this={main} />
  </main>
</template>

<script>
  export default {
    computed: {
      main({ $curi }) {
        return $curi.response.body.main;
      },
      menu({ $curi }) {
        return $curi.response.body.menu;
      }
    }
  }
</script>`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section title="Navigating" id="navigating">
        <Explanation>
          <p>
            The <Cmp>Link</Cmp> component is used to navigate between routes
            within an application. When it renders in the DOM, it will render as
            an anchor (<Cmp>a</Cmp>) element.
          </p>
          <p>
            The <Cmp>Link</Cmp>'s <IJS>to</IJS> prop describes which route
            clicking the link should navigate to. If you pass an invalid route
            name, Curi will warn you.
          </p>
          <p>
            If a route has any params (or if any of a route's ancestors have
            params for nested routes), the <IJS>params</IJS> prop is used to
            pass these to the <Cmp>Link</Cmp>.
          </p>
        </Explanation>
        <CodeBlock lang="html">
          {`<template>
  <nav>
    <ul>
      <li>
        <Link to="Home">Home</Link>
      </li>
      <li>
        <Link to="About">About</Link>
      </li>
      <li>
        <Link to="User" params={{ id: 'blue' }}>
          Blue
        </Link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { Link } from "@curi/svelte";

  export default {
    components: { Link }
  };
</script>`}
        </CodeBlock>

        <Explanation>
          <p>
            The <Cmp>Link</Cmp> also takes <IJS>hash</IJS>, <IJS>query</IJS>,
            and <IJS>state</IJS> props to attach their values to the location
            that will be navigated to.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`<Link to="Home" hash="details">Home</Link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </Section>

      <Explanation>
        <p>
          Please check out the full{" "}
          <Link to="Package" params={{ package: "svelte" }} hash="API">
            <IJS>@curi/svelte</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </Explanation>
    </React.Fragment>
  );
}
