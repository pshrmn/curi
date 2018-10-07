import React from "react";
import { Link } from "@curi/react-dom";

import APIBlock from "../../components/package/APIBlock";
import About from "../../components/package/About";
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from "../../components/highlight/Inline";
import { Note } from "../../components/Messages";
import { Section, Subsection } from "../../components/layout/Sections";
import { CodeBlock, Explanation } from "../../components/layout/Groups";

export default class VuePkg extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <About>
          <Explanation>
            <p>This package enables you to use Curi alongside VueJS.</p>
            <p>
              For more information on using Curi with Vue, please check out the{" "}
              <Link to="Guide" params={{ slug: "vue" }}>
                Vue guide
              </Link>.
            </p>
          </Explanation>
        </About>
        <APIBlock>
          <Section title="CuriPlugin" id="curiplugin">
            <Explanation>
              <p>What does the plugin do?</p>
              <ol>
                <li>
                  Register <Cmp>curi-link</Cmp> and <Cmp>curi-block</Cmp>{" "}
                  components with Vue so they can be used anywhere within your
                  application without manually importing.
                </li>
                <li>
                  Makes the Curi router globally available to Vue components as{" "}
                  <IJS>$router</IJS>.
                </li>
                <li>
                  Makes responses and navigations available to components
                  through the <IJS>$curi</IJS> property. <IJS>$curi</IJS> is
                  responsive, so when a new response is emitted,{" "}
                  <IJS>$curi.response</IJS> and <IJS>$curi.navigation</IJS> will
                  automatically be updated.
                </li>
              </ol>
            </Explanation>
            <CodeBlock>
              {`import { CuriPlugin } from '@curi/vue';

const router = curi(history, routes);
Vue.use(CuriPlugin, { router });`}
            </CodeBlock>
          </Section>

          <Section title={<Cmp>curi-link</Cmp>} id="link">
            <p>
              The <Cmp>curi-link</Cmp> component will render an anchor (<Cmp>
                a
              </Cmp>) element.
            </p>

            <Subsection tag="h4" title="to" id="Link-to">
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
            </Subsection>

            <Subsection tag="h4" title="params" id="Link-params">
              <Explanation>
                <p>
                  <IJS>params</IJS> - An object containing the key-value params
                  for the route. For example, if you are linking to a route with
                  the path <IJS>album/:title</IJS>, the params object should
                  have a <IJS>title</IJS> property.
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
            </Subsection>

            <Subsection tag="h4" title="hash" id="Link-hash">
              <Explanation>
                <p>
                  <IJS>hash</IJS> - the hash for the location to link to
                </p>
              </Explanation>
              <CodeBlock lang="html">
                {`<curi-link to="Home" hash="test">Home</curi-link>
<!-- <a href="/#test">Home</a> -->`}
              </CodeBlock>
            </Subsection>

            <Subsection tag="h4" title="query" id="Link-query">
              <Explanation>
                <p>
                  <IJS>query</IJS> - the query for the location to link to
                </p>
              </Explanation>
              <CodeBlock lang="html">
                {`<curi-link to="Home" query="one=1">Home</curi-link>
<!-- <a href="/?one=1">Home</a> -->`}
              </CodeBlock>
            </Subsection>

            <Subsection tag="h4" title="state" id="Link-state">
              <Explanation>
                <IJS>state</IJS> - the state to associated with the location
              </Explanation>
            </Subsection>

            <Subsection tag="h4" title="slots" id="Link-slots">
              <Explanation>
                <p>
                  The <Cmp>curi-link</Cmp>'s can take either a regular slot or a
                  scoped slot.
                </p>
                <p>
                  When given a scoped slot, the <Cmp>curi-link</Cmp> will inject
                  the link's navigation state (a <IJS>navigating</IJS>{" "}
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
            </Subsection>
          </Section>

          <Section title={<Cmp>curi-block</Cmp>} id="block">
            <Explanation>
              <p>
                The <Cmp>curi-block</Cmp> component can be used to automatically
                block navigation from a page. This will only block in-app
                navigation. If the user attempts to leave your application, they
                will not be blocked.
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
          </Section>

          <Section title={<IJS>curi-focus</IJS>} id="curi-focus">
            <Explanation>
              <p>
                The <IJS>curi-focus</IJS> directive is used to specify an
                element that should be focused when a new response is emitted.
              </p>
              <p>
                The DOM component that gets the ref should either already be
                "focusable", like an <Cmp>input</Cmp>, or be given a{" "}
                <IJS>tabIndex</IJS> prop (usually with the value of{" "}
                <IJS>-1</IJS>). If neither of these conditions is met, then the
                document's <Cmp>body</Cmp> will be focused.
              </p>
              <p>
                The focused element will have an outline (the exact style varies
                by browser). You can remove this visual with a CSS outline of{" "}
                <IJS>"none"</IJS>.
              </p>
              <Note>
                You should only have one focused element rendered at a time.
              </Note>
            </Explanation>
            <CodeBlock lang="html">
              {`<template>
  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">
    <component :is="$curi.response.body" />
  </main>
</template>`}
            </CodeBlock>
            <Section tag="h3" title="Properties" id="focus-properties">
              <Subsection tag="h4" title="key" id="focus-key">
                <Explanation>
                  <p>
                    A value that changes when there is a new response; the{" "}
                    <IJS>response</IJS> is usually fine for this.
                  </p>
                </Explanation>
              </Subsection>
              <Subsection tag="h4" title="preserve" id="focus-preserve">
                <Explanation>
                  <p>
                    When <IJS>true</IJS> (<IJS>false</IJS> by default), the
                    element will not be focused if one of its children elements
                    is already focused.
                  </p>
                  <p>
                    This is useful if the element has children that are
                    automatically focused (<Cmp>input autofocus</Cmp>).
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<!-- <input> will be focused -->
<template>
  <main
    :tabIndex="-1"
    v-curi-focus="{ key: $curi.response, preserve: true}"
  >
    <input autofocus />
  </main>
</template>

<!-- <main> will be focused -->
<template>
  <main :tabIndex="-1" v-curi-focus="{ key: $curi.response }">
    <input autofocus />
  </main>
</template>`}
                </CodeBlock>
              </Subsection>
              <Subsection
                tag="h4"
                title="preventScroll"
                id="focus-preventScroll"
              >
                <Explanation>
                  <p>
                    When <IJS>true</IJS> (<IJS>false</IJS> by default), the
                    element will not be scrolled to when it is focused.
                  </p>
                  <p>
                    This only works in browsers that support the{" "}
                    <IJS>preventScroll</IJS> option for <IJS>focus()</IJS>.
                  </p>
                </Explanation>
                <CodeBlock lang="html">
                  {`<template>
  <main
    :tabIndex="-1"
    v-curi-focus="{ key: $curi.response, preventScroll: true}"
  >
  <component :is="$curi.response.body" />
  </main>
</template>`}
                </CodeBlock>
              </Subsection>
            </Section>
          </Section>
        </APIBlock>
      </React.Fragment>
    );
  }
}
