import React from 'react';
import BasePackage from './base/BasePackage';
import APIBlock from './base/APIBlock';
import {
  InlineJS as IJS,
  InlineComponent as Cmp,
  PrismBlock
} from '../components/PrismBlocks';
import { Section, Subsection } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={
      <p>
        This package enables you to use Curi alongside VueJS. This is more of a
        proof of concept than a fleshed out routing solution and only provides
        bare routing functionality.
      </p>
    }
  >
    <APIBlock>
      <Section tag="h3" title="installCuri" id="installCuri" />
      <p>
        The <IJS>installCuri</IJS> will install a Vue plugin that adds Curi
        support to your Vue instance. This will also automatically subscribe to
        your Curi router so that your application will re-render whenever a new
        response is emitted.
      </p>
      <PrismBlock lang="javascript">
        {`import { installCuri } from '@curi/vue';

const router = curi(history, routes);
installCuri(Vue, router);`}
      </PrismBlock>
      <Section tag="h3" title="CuriPlugin" id="curiplugin">
        <p>
          If you would prefer to install the Curi Vue plugin yourself, you can
          also import it directly.
        </p>
        <p>
          What does the plugin do? First, it will register <Cmp>curi-link</Cmp>{' '}
          and <Cmp>curi-block</Cmp> components with Vue. You can use these
          components anywhere within your application. Second, it makes your
          router and any response/action properties reactive Vue properties.
          These values are grouped under the <IJS>$curi</IJS> variable as{' '}
          <IJS>$curi.router</IJS>, <IJS>$curi.response</IJS>, and{' '}
          <IJS>$curi.action</IJS>.
        </p>
        <PrismBlock lang="javascript">
          {`import { CuriPlugin } from '@curi/vue';

const router = curi(history, routes);
Vue.use(CuriPlugin, { router });`}
        </PrismBlock>

        <Subsection tag="h4" title="Components" id="components">
          <p>
            <IJS>CuriPlugin</IJS> will register a few components that you can
            use throughout your application.
          </p>

          <Subsection tag="h5" title={<Cmp>curi-link</Cmp>} id="link">
            <p>
              The <Cmp>curi-link</Cmp> component will render an anchor (<Cmp>
                a
              </Cmp>) element. It can take three props:
            </p>
            <ul>
              <li>
                <IJS>to</IJS> - The name of the route to navigate to.{' '}
                <em>This is required</em>.
              </li>
              <li>
                <IJS>params</IJS> - An object containing the key-value params
                for the route. For example, if you are linking to a route with
                the path <IJS>album/:title</IJS>, the params object should have
                a <IJS>title</IJS> property.
              </li>
              <li>
                <IJS>details</IJS> - An object containing additional location
                properties that should be used for generating the anchor's{' '}
                <IJS>href</IJS>. These additional properties may be{' '}
                <IJS>query</IJS>, <IJS>hash</IJS>, and <IJS>state</IJS> (which
                isn't actually part of the <IJS>href</IJS>).
              </li>
            </ul>
            <p>
              Additionally, any slots that you pass to the <Cmp>curi-link</Cmp>{' '}
              will be rendered inside of the anchor.
            </p>
            <PrismBlock lang="html">
              {`<curi-link to='Album' :params="{ title: 'Coloring Book' }">Coloring Book</curi-link>`}
            </PrismBlock>
          </Subsection>

          <Subsection tag="h5" title={<Cmp>curi-block</Cmp>} id="block">
            <p>
              The <Cmp>curi-block</Cmp> component can be used to automatically
              block navigation from a page. This will only block in-app
              navigation. If the user attempts to leave your application, they
              will not be blocked.
            </p>
            <p>
              The <Cmp>curi-block</Cmp> expects two props: <IJS>action</IJS> and{' '}
              <IJS>confirm</IJS>.
            </p>
            <ul>
              <li>
                <IJS>active</IJS> - When this is true, navigation will be
                blocked and when it is false, navigation will be allowed. If you
                do not provide this prop, it will default to <IJS>true</IJS>.
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
          </Subsection>
        </Subsection>
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
    <Nav />
    <component :is="$curi.response.body" />
  </div>
</template>

<script>
  import Nav from './Nav';
  export default {
    name: 'app',
    components: { Nav }
  }
</script>
`}
      </PrismBlock>

      <PrismBlock lang="javascript">
        {`// renderFunction.js
import Nav from './Nav';
export default function renderFunction(h) {
  return h('div', [
    h(Nav),
    h(this.$curi.resp.body)
  ]);
}`}
      </PrismBlock>

      <p>
        While <IJS>installCuri</IJS> subscribes to your router object, you will
        still need to wait for it to emit its first update before you can
        render. To do that, you can pass the <IJS>{`{ once: true }`}</IJS>{' '}
        option to a <IJS>router.respond</IJS> call.
      </p>

      <PrismBlock lang="javascript">
        {`
router.respond(() => {
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
}, { once: true });`}
      </PrismBlock>
    </Section>
  </BasePackage>
);
