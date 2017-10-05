import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';
import { Section } from '../components/Sections';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        This package enables you to use Curi alongside VueJS. This is more of a proof of concept
        than a fleshed out routing solution and only provides bare routing functionality.
      </p>
    )}
  >
    <APIBlock>
      <Section
        tag='h3'
        title='CuriPlugin'
        id='h3'
      >
        <p>
          curi-vue exports a Vue plugin that you can use to add Curi support to a Vue application.
          The plugin is passed to Vue using the use method. Along with the plugin, you will need to
          pass your Curi configuration object to <IJS>Vue.use</IJS>.
        </p>
        <PrismBlock lang='javascript'>
          {
`import CuriPlugin from '@curi/vue';

const config = createConfig(history, routes);
Vue.use(CuriPlugin, { config });`
          }
        </PrismBlock>
        <p>
          This will do two things. First, it will register a <IJS>curi-link</IJS> component
          with Vue. You can use that component to navigate within your application. Second, it makes
          your configuration a global Vue property, which you can then access as <IJS>Vue.Curi</IJS>.
        </p>
      </Section>
    </APIBlock>

    <Section
      title='Usage'
      id='usage'
    >
      <p>
        You can either use a Vue component or a render function to render Curi responses.
      </p>

      <PrismBlock lang='html'>
        {
`<!-- App.vue -->
<template>
  <div>
    <Nav />
    <component :is="response.body" :params="response.params" :data="response.data" />
  </div>
</template>

<script>
  import Nav from './Nav';
  export default {
    name: 'app',
    props: ['response'],
    components: { Nav }
  }
</script>
`
        }
      </PrismBlock>

      <PrismBlock lang='javascript'>
        {
`// renderFunction.js
import Nav from './Nav';
export default function renderFunction(h, resp) {
  return h('div', [
    h(Nav),
    h(resp.body, { props: { params: resp.params, data: resp.data } })
  ]);
}`
        }
      </PrismBlock>

      <p>
        To actually render the application, you will want to make <IJS>response</IJS> an observed property
        of your application. Then, you can use <IJS>config.subscribe</IJS> to update that object whenever
        a new response is emitted.
      </p>

      <PrismBlock lang='javascript'>
        {
`// 1. wait for the initial response to be resolved
config.ready().then(resp => {
  // 2. create the Vue app
  const vm = new Vue({
    el: '#app',
    // 3. initialize the data with the first response object
    data: {
      response: resp
    },

    // 4. either use a template or a render function
    // 4a. TEMPLATE
    template: '<app :response="response" />',
    components: { app: App },

    // 4b. RENDER FUNCTION
    methods: {
      render: function(h, resp) {
        const { body } = resp;
        return h(body, { params: resp.params });
      }
    },
    render: function(h) {
      return this.render(h, this.response);
    }
  });

  // 5. Subscribe to the config and update vm.response whenever
  //    a new response is generated.
  config.subscribe(resp => {
    vm.response = resp;
  });
});`
        }
      </PrismBlock>
    </Section>
  </BasePackage>
);
