import React from "react";
import { Link } from "@curi/react-dom";

import BasePackage from "./base/BasePackage";
import APIBlock from "./base/APIBlock";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/PrismBlocks";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/Sections";
import {
  SideBySide,
  CodeBlock,
  Explanation
} from "../../components/SideBySide";

export default class VuePkg extends React.PureComponent {
  render() {
    const { name, version, globalName } = this.props;
    return (
      <BasePackage
        name={name}
        version={version}
        globalName={globalName}
        about={
          <div>
            <p>This package enables you to use Curi alongside VueJS.</p>
            <p>
              For more information on using Curi with Vue, please check out the{" "}
              <Link to="Guide" params={{ slug: "vue" }}>
                Vue guide
              </Link>.
            </p>
          </div>
        }
      >
        <APIBlock>
          <Section title="CuriPlugin" id="curiplugin">
            <SideBySide>
              <Explanation>
                <p>What does the plugin do?</p>
                <ol>
                  <li>
                    Register <Cmp>curi-link</Cmp> and <Cmp>curi-block</Cmp>{" "}
                    components with Vue so they can be used anywhere within your
                    application without manually importing.
                  </li>
                  <li>
                    Makes the Curi router globally available to Vue components
                    as <IJS>$router</IJS>.
                  </li>
                  <li>
                    Makes responses and navigations available to components
                    through the <IJS>$curi</IJS> property. <IJS>$curi</IJS> is
                    responsive, so when a new response is emitted,{" "}
                    <IJS>$curi.response</IJS> and <IJS>$curi.navigation</IJS>{" "}
                    will automatically be updated.
                  </li>
                </ol>
              </Explanation>
              <CodeBlock>
                {`import { CuriPlugin } from '@curi/vue';

const router = curi(history, routes);
Vue.use(CuriPlugin, { router });`}
              </CodeBlock>
            </SideBySide>
          </Section>

          <Section title={<Cmp>curi-link</Cmp>} id="link">
            <p>
              The <Cmp>curi-link</Cmp> component will render an anchor (<Cmp>
                a
              </Cmp>) element.
            </p>

            <Subsection tag="h4" title="to" id="Link-to">
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>to</IJS> - The name of the route to navigate to.{" "}
                    <em>This is required</em>.
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<curi-link to='Home'>Home</curi-link>
<!-- <a href="/">Home</a> -->`}
                </CodeBlock>
              </SideBySide>
            </Subsection>

            <Subsection tag="h4" title="params" id="Link-params">
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>params</IJS> - An object containing the key-value
                    params for the route. For example, if you are linking to a
                    route with the path <IJS>album/:title</IJS>, the params
                    object should have a <IJS>title</IJS> property.
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<curi-link
  to='Album'
  :params="{ title: 'Coloring Book' }"
  >
  Coloring Book
</curi-link>`}
                </CodeBlock>
              </SideBySide>
            </Subsection>

            <Subsection tag="h4" title="hash" id="Link-hash">
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>hash</IJS> - the hash for the location to link to
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<curi-link to="Home" hash="test">Home</curi-link>
<!-- <a href="/#test">Home</a> -->`}
                </CodeBlock>
              </SideBySide>
            </Subsection>

            <Subsection tag="h4" title="query" id="Link-query">
              <SideBySide>
                <Explanation>
                  <p>
                    <IJS>query</IJS> - the query for the location to link to
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<curi-link to="Home" query="one=1">Home</curi-link>
<!-- <a href="/?one=1">Home</a> -->`}
                </CodeBlock>
              </SideBySide>
            </Subsection>

            <Subsection tag="h4" title="state" id="Link-state">
              <SideBySide>
                <Explanation>
                  <IJS>state</IJS> - the state to associated with the location
                </Explanation>
              </SideBySide>
            </Subsection>

            <Subsection tag="h4" title="slots" id="Link-slots">
              <SideBySide>
                <Explanation>
                  <p>
                    The <Cmp>curi-link</Cmp>'s can take either a regular slot or
                    a scoped slot.
                  </p>
                  <p>
                    When given a scoped slot, the <Cmp>curi-link</Cmp> will
                    inject the link's navigation state (a <IJS>navigating</IJS>{" "}
                    property). The navigation state is <IJS>false</IJS> by
                    default, <IJS>true</IJS> when the <Cmp>curi-link</Cmp> is
                    clicked, and <IJS>false</IJS> when the the navigation
                    finishes/is cancelled.
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<!-- a regular slot -->
<curi-link to="Home">
  Home
</curi-link>

<!-- a scoped slot -->
<curi-link to="User" :params="{ id: 1 }">
  <template slot-scope="{ navigating }">
    User 1
    <spinner v-if="navigating" />
  </template>
</curi-ink>`}
                </CodeBlock>
              </SideBySide>
            </Subsection>
          </Section>

          <Section title={<Cmp>curi-block</Cmp>} id="block">
            <SideBySide>
              <Explanation>
                <p>
                  The <Cmp>curi-block</Cmp> component can be used to
                  automatically block navigation from a page. This will only
                  block in-app navigation. If the user attempts to leave your
                  application, they will not be blocked.
                </p>
                <p>
                  The <Cmp>curi-block</Cmp> expects two props: <IJS>active</IJS>{" "}
                  and <IJS>confirm</IJS>.
                </p>
                <ul>
                  <li>
                    <IJS>active</IJS> - When this is true, navigation will be
                    blocked and when it is false, navigation will be allowed. If
                    you do not provide this prop, it will default to{" "}
                    <IJS>true</IJS>.
                  </li>
                  <li>
                    <IJS>confirm</IJS> - The function that will be called to
                    confirm/deny the navigation.
                  </li>
                </ul>
              </Explanation>
              <CodeBlock lang="html">
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
              </CodeBlock>
            </SideBySide>
          </Section>

          <Section title={<IJS>curi-focus</IJS>} id="curi-focus">
            <SideBySide>
              <Explanation>
                <p>
                  The <IJS>curi-focus</IJS> directive is used to specify an
                  element that should be focused when a new response is emitted.
                </p>
                <p>
                  The DOM component that gets the ref should either already be
                  "focusable", like an <Cmp>input</Cmp>, or be given a{" "}
                  <IJS>tabIndex</IJS> prop (usually with the value of{" "}
                  <IJS>-1</IJS>). If neither of these conditions is met, then
                  the document's <Cmp>body</Cmp> will be focused.
                </p>
                <p>
                  The focused element will have an outline (the exact style
                  varies by browser). You can remove this visual with a CSS
                  outline of <IJS>"none"</IJS>.
                </p>
                <Note>
                  You should only have one focused element rendered at a time.
                </Note>
              </Explanation>
              <CodeBlock lang="html">
                {`<template>
  <main :tabIndex="-1" v-curi-focus="$curi.response">
    <component :is="$curi.response.body" />
  </main>
</template>`}
              </CodeBlock>
            </SideBySide>
          </Section>
        </APIBlock>

        <Section title="Usage" id="usage">
          <SideBySide>
            <Explanation>
              <p>
                You can either use a Vue component or a render function to
                render Curi responses.
              </p>
            </Explanation>

            <CodeBlock lang="html">
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
            </CodeBlock>
          </SideBySide>
          <SideBySide>
            <Explanation />
            <CodeBlock>
              {`// renderFunction.js
import NavLinks from './NavLinks';
export default function renderFunction(h) {
  return h('div', [
    h(NavLinks),
    h(this.$curi.response.body)
  ]);
}`}
            </CodeBlock>
          </SideBySide>
          <SideBySide>
            <Explanation>
              <p>
                If the router has async routes, you will need to wait for it to
                emit its first response before you can render. This can be done
                by calling your rendering code in an observer function passed to{" "}
                <IJS>router.once()</IJS>.
              </p>
            </Explanation>
            <CodeBlock>
              {`router.once(() => {
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
            </CodeBlock>
          </SideBySide>
        </Section>
      </BasePackage>
    );
  }
}
