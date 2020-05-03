import React from "react";
import { Link } from "@curi/react-dom";

import {
  TitledPlainSection,
  PlainSection,
  HashSection,
  Paragraph,
  CodeBlock,
  IJS,
  Cmp
} from "../../components/guide/common";

let meta = {
  title: "Vue"
};

let renderingMeta = {
  title: "Rendering with the response",
  hash: "rendering-response"
};
let a11yMeta = {
  title: "Accessibility",
  hash: "accessibility"
};
let pluginMeta = {
  title: "The Curi Plugin",
  hash: "plugin",
  children: [renderingMeta]
};

let navigatingMeta = {
  title: "Navigating",
  hash: "navigating"
};

let contents = [pluginMeta, navigatingMeta];

function VueGuide() {
  return (
    <React.Fragment>
      <TitledPlainSection title={meta.title} />

      <HashSection meta={pluginMeta} tag="h2">
        <Paragraph>
          The <IJS>CuriPlugin</IJS> for Vue allows you to interface your router
          with a Vue application. The plugin sets up a reactive object for
          tracking responses using an{" "}
          <Link name="Guide" params={{ slug: "navigating" }} hash="observer">
            observer
          </Link>
          , so whenever there is a new response, the parts of your application
          that use the response will be re-rendered.
        </Paragraph>
        <Paragraph>
          The plugin also makes the <IJS>response</IJS> accessible to every
          component in your application through the <IJS>$curi</IJS> property.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`import Vue from "vue";
import { CuriPlugin } from "@curi/vue";

import router from "./router";

Vue.use(CuriPlugin, { router });`}
        </CodeBlock>

        <HashSection meta={renderingMeta} tag="h3">
          <Paragraph>
            Vue allows you to render dynamic components using the{" "}
            <Cmp>component :is</Cmp> syntax. If you set Vue components as the{" "}
            <IJS>body</IJS> properties on your responses, you can combine{" "}
            <Cmp>component :is</Cmp> and <IJS>response.body</IJS> to render the
            appropriate component for a <IJS>response</IJS>.
          </Paragraph>
          <Paragraph>
            A root component is a good place to perform general application
            layout, like menus, in addition to rendering the response's{" "}
            <IJS>body</IJS>.
          </Paragraph>

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

          <Paragraph>
            If your routes use an object to attach multiple components to a
            response, splitting them apart in computed properties may give your
            templates a cleaner look.
          </Paragraph>
          <Paragraph>
            If you do attach multiple components to a response, please remember
            that you want every route to set the same <IJS>body</IJS> shape.
            Otherwise, you'll have to determine the shape and change how you
            render, which can quickly become messy.
          </Paragraph>

          <CodeBlock lang="html">
            {`<script>
let routes = prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
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

          <Paragraph>
            In addition to the <IJS>response</IJS>, the current{" "}
            <IJS>navigation</IJS> object (the <IJS>previous</IJS> response and
            the navigation <IJS>action</IJS>) is globally available through{" "}
            <IJS>$curi.navigation</IJS>
          </Paragraph>
          <Paragraph>
            The router is globally available as <IJS>$router</IJS>.
          </Paragraph>
        </HashSection>

        <HashSection meta={a11yMeta} tag="h3">
          <Paragraph>
            Managing the application's focus when navigating is useful for users
            who use screen readers. The <IJS>curi-focus</IJS> directive provides
            a convenient way to focus a page's main content when it renders a
            new response.
          </Paragraph>
          <Paragraph>
            You can read some more about accessibility in the{" "}
            <Link name="Guide" params={{ slug: "accessibility" }}>
              accessibility
            </Link>{" "}
            guide.
          </Paragraph>

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
        </HashSection>
      </HashSection>

      <HashSection meta={navigatingMeta} tag="h2">
        <Paragraph>
          The <IJS>curi-link</IJS> component is used to navigate between routes
          within an application. When it renders in the DOM, it will render as
          an anchor (<Cmp>a</Cmp>) element.
        </Paragraph>
        <Paragraph>
          The <IJS>curi-link</IJS>'s <IJS>name</IJS> prop describes which route
          clicking the link should navigate to. If you pass an invalid route
          name, Curi will warn you.
        </Paragraph>
        <Paragraph>
          If a route has any params (or if any of a route's ancestors have
          params for nested routes), the <IJS>params</IJS> prop is used to pass
          these to the <IJS>curi-link</IJS>.
        </Paragraph>

        <CodeBlock lang="html">
          {`<template>
  <nav>
    <ul>
      <li>
        <curi-link name="Home">Home</curi-link>
      </li>
      <li>
        <curi-link name="About">About</curi-link>
      </li>
      <li>
        <curi-link name="User" :params="{ id: 'blue' }">
          Blue
        </curi-link>
      </li>
    </ul>
  </nav>
</template>`}
        </CodeBlock>

        <Paragraph>
          The <IJS>curi-link</IJS> also takes <IJS>hash</IJS>, <IJS>query</IJS>,
          and <IJS>state</IJS> props to attach their values to the location that
          will be navigated to.
        </Paragraph>

        <CodeBlock lang="jsx">
          {`<curi-link name="Home" hash="details">Home</curi-link>
// renders
<a href="/#details">Home</a>`}
        </CodeBlock>
      </HashSection>

      <PlainSection>
        <Paragraph>
          Please check out the full{" "}
          <Link
            name="Package"
            params={{ package: "vue", version: "v1" }}
            hash="API"
          >
            <IJS>@curi/vue</IJS>
          </Link>{" "}
          API documentation to see every component that the package provides.
        </Paragraph>
      </PlainSection>
    </React.Fragment>
  );
}

export { VueGuide as component, contents };
