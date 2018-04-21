import React from "react";
import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={<p>This package enables you to use Curi alongside VueJS.</p>}
  >
    <APIBlock>
      <Section tag="h3" title="CuriPlugin" id="curiplugin">
        <p>What does the plugin do?</p>
        <ol>
          <li>
            Register <Cmp>curi-link</Cmp> and <Cmp>curi-block</Cmp> components
            with Vue so they can be used anywhere within your application
            without manually importing.
          </li>
          <li>
            Makes the Curi router globally available to Vue components as{" "}
            <IJS>$router</IJS>.
          </li>
          <li>
            Makes responses and navigations available to components through the{" "}
            <IJS>$curi</IJS> property. <IJS>$curi</IJS> is responsive, so when a
            new response is emitted, <IJS>$curi.response</IJS> and{" "}
            <IJS>$curi.navigation</IJS> will automatically be updated.
          </li>
        </ol>
        <PrismBlock lang="javascript">
          {`import { CuriPlugin } from '@curi/vue';

const router = curi(history, routes);
Vue.use(CuriPlugin, { router });`}
        </PrismBlock>
      </Section>

      <Section tag="h3" title={<Cmp>curi-link</Cmp>} id="link">
        <p>
          The <Cmp>curi-link</Cmp> component will render an anchor (<Cmp>a</Cmp>)
          element.
        </p>
        <ul>
          <li>
            <p>
              <IJS>to</IJS> - The name of the route to navigate to.{" "}
              <em>This is required</em>.
            </p>
            <PrismBlock lang="html">
              {`<curi-link to='Home'>Home</curi-link>
<!-- <a href="/">Home</a> -->`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>params</IJS> - An object containing the key-value params for
              the route. For example, if you are linking to a route with the
              path <IJS>album/:title</IJS>, the params object should have a{" "}
              <IJS>title</IJS> property.
            </p>
            <PrismBlock lang="html">
              {`<curi-link
  to='Album'
  :params="{ title: 'Coloring Book' }"
  >
  Coloring Book
  </curi-link>`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>hash</IJS> - the hash for the location to link to
            </p>
            <PrismBlock lang="html">
              {`<curi-link to="Home" hash="test">Home</curi-link>
<!-- <a href="/#test">Home</a> -->`}
            </PrismBlock>
          </li>
          <li>
            <p>
              <IJS>query</IJS> - the query for the location to link to
            </p>
            <PrismBlock lang="html">
              {`<curi-link to="Home" query="one=1">Home</curi-link>
<!-- <a href="/?one=1">Home</a> -->`}
            </PrismBlock>
          </li>
          <li>
            <IJS>state</IJS> - the state to associated with the location
          </li>
        </ul>
        <p>
          Additionally, any slots that you pass to the <Cmp>curi-link</Cmp> will
          be rendered inside of the anchor.
        </p>
        <PrismBlock lang="html">
          {`<curi-link
  to='Album'
  :params="{ title: 'Coloring Book' }"
>
  <div>
    Coloring
    <span>Book</span>
  </div>
</curi-link>
<!--
<a href="album/Coloring Book">
  <div>Coloring <span>Book</span></div>
</a>
-->`}
        </PrismBlock>
      </Section>

      <Section tag="h3" title={<Cmp>curi-block</Cmp>} id="block">
        <p>
          The <Cmp>curi-block</Cmp> component can be used to automatically block
          navigation from a page. This will only block in-app navigation. If the
          user attempts to leave your application, they will not be blocked.
        </p>
        <p>
          The <Cmp>curi-block</Cmp> expects two props: <IJS>active</IJS> and{" "}
          <IJS>confirm</IJS>.
        </p>
        <ul>
          <li>
            <IJS>active</IJS> - When this is true, navigation will be blocked
            and when it is false, navigation will be allowed. If you do not
            provide this prop, it will default to <IJS>true</IJS>.
          </li>
          <li>
            <IJS>confirm</IJS> - The function that will be called to
            confirm/deny the navigation.
          </li>
        </ul>
        <PrismBlock lang="html">
          {`<template>
  <div>
    <!-- ... -->
    <curi-block :active="active" :confirm="confirm" />
  </div>
</template>

<script>
  export default {
    data: {
      active: true
    },
    methods: {
      confirm(information, go, stay) {
        const confirmed = window.confirm('Navigate?');
        if (confirmed) {
          go();
        } else {
          stay();
        }
      }
    }
  }
</script>`}
        </PrismBlock>
      </Section>
    </APIBlock>

    <Section title="Usage" id="usage">
      <p>
        You can either use a Vue component or a render function to render Curi
        responses.
      </p>

      <PrismBlock lang="html">
        {`<!-- App.vue -->
<template>
  <div>
    <NavLinks />
    <component :is="$curi.response.body" />
  </div>
</template>

<script>
  import NavLinks from './NavLinks';
  export default {
    name: 'app',
    components: { NavLinks }
  }
</script>
`}
      </PrismBlock>

      <PrismBlock lang="javascript">
        {`// renderFunction.js
import NavLinks from './NavLinks';
export default function renderFunction(h) {
  return h('div', [
    h(NavLinks),
    h(this.$curi.response.body)
  ]);
}`}
      </PrismBlock>

      <p>
        If the Curi is in async mode, you will still need to wait for it to emit
        its first response before you can render. This can be done by calling
        your rendering code in a callback function passed to{" "}
        <IJS>router.respond()</IJS>.
      </p>

      <PrismBlock lang="javascript">
        {`router.respond(() => {
  const vm = new Vue({
    el: '#app',
      
    // either use a template or a render function
    // TEMPLATE
    template: '<app />',
    components: { app: App },

    // RENDER FUNCTION
    render: function(h) {
      return h(this.$curi.response.body)
    }
  });
});`}
      </PrismBlock>
    </Section>
  </BasePackage>
);
