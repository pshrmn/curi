import React from "react";
import { Link } from "@curi/react-dom";

import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Section } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

const meta = {
  title: "Vue"
};

export default function VueGuide() {
  return (
    <React.Fragment>
      <h1>{meta.title}</h1>

      <Section title="The Curi Plugin" id="plugin">
        <Explanation>
          <p>
            The <IJS>CuriPlugin</IJS> for Vue allows you to interface your
            router with a Vue application. The plugin sets up a reactive object
            for tracking responses using an{" "}
            <Link name="Guide" params={{ slug: "navigating" }} hash="observer">
              observer
            </Link>, so whenever there is a new response, the parts of your
            application that use the response will be re-rendered.
          </p>
          <p>
            The plugin also makes the <IJS>response</IJS> accessible to every
            component in your application through the <IJS>$curi</IJS> property.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`import Vue from "vue";
import { CuriPlugin } from "@curi/vue";

import router from "./router";

Vue.use(CuriPlugin, { router });`}
        </CodeBlock>

        <Section
          title="Rendering with the response"
          id="rendering-response"
          tag="h3"
        >
          <Explanation>
            <p>
              Vue allows you to render dynamic components using the{" "}
              <Cmp>component :is</Cmp> syntax. If you set Vue components as the{" "}
              <IJS>body</IJS> properties on your responses, you can combine{" "}
              <Cmp>component :is</Cmp> and <IJS>response.body</IJS> to render
              the appropriate component for a <IJS>response</IJS>.
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
    <component :is="$curi.response.body" />
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
const routes = prepareRoutes([
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
]);
</script>

<template>
  <header>
    <component :is="menu" />
  </header>
  <main>
    <component :is="main" />
  </main>
</template>

<script>
  export default {
    computed: {
      main() {
        return this.$curi.response.body.main;
      },
      menu() {
        return this.$curi.response.body.menu;
      }
    }
  }
</script>`}
          </CodeBlock>

          <Explanation>
            <p>
              In addition to the <IJS>response</IJS>, the current{" "}
              <IJS>navigation</IJS> object (the <IJS>previous</IJS> response and
              the navigation <IJS>action</IJS>) is globally available through{" "}
              <IJS>$curi.navigation</IJS>
            </p>
            <p>
              The router is globally available as <IJS>$router</IJS>.
            </p>
          </Explanation>
        </Section>

        <Section title="Accessibility" id="accessibility" tag="h3">
          <Explanation>
            <p>
              Managing the application's focus when navigating is useful for
              users who use screen readers. The <IJS>curi-focus</IJS> directive
              provides a convenient way to focus a page's main content when it
              renders a new response.
            </p>
            <p>
              You can read some more about accessibility in the{" "}
              <Link name="Guide" params={{ slug: "accessibility" }}>
                accessibility
              </Link>{" "}
              guide.
            </p>
          </Explanation>
          <CodeBlock lang="html" data-line="5">
            {`<template>
  <header>
    <NavLinks />
  </header>
  <main :tabIndex="-1" v-curi-focus="$curi.response">
    <component :is="$curi.response.body" />
  </main>
</template>

<script>
  import NavLinks from "./NavLinks";
  export default {
    components: { NavLinks }
  };
</script>`}
          </CodeBlock>
        </Section>
      </Section>

      <Section title="Navigating" id="navigating">
        <Explanation>
          <p>
            The <Cmp>curi-link</Cmp> component is used to navigate between
            routes within an application. When it renders in the DOM, it will
            render as an anchor (<Cmp>a</Cmp>) element.
          </p>
          <p>
            The <Cmp>curi-link</Cmp>'s <IJS>to</IJS> prop describes which route
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
        <curi-link to="Home">Home</curi-link>
      </li>
      <li>
        <curi-link to="About">About</curi-link>
      </li>
      <li>
        <curi-link to="User" :params="{ id: 'blue' }">
          Blue
        </curi-link>
      </li>
    </ul>
  </nav>
</template>`}
        </CodeBlock>

        <Explanation>
          <p>
            The <Cmp>curi-link</Cmp> also takes <IJS>hash</IJS>,{" "}
            <IJS>query</IJS>, and <IJS>state</IJS> props to attach their values
            to the location that will be navigated to.
          </p>
        </Explanation>
        <CodeBlock lang="jsx">
          {`<curi-link to="Home" hash="details">Home</curi-link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </Section>

      <Explanation>
        <p>
          Please check out the full{" "}
          <Link
            name="Package"
            params={{ package: "vue", version: "v1" }}
            hash="API"
          >
            <IJS>@curi/vue</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </p>
      </Explanation>
    </React.Fragment>
  );
}
