# curi-vue

Vue has its own official routing solution, but `curi-vue` offers an alternative for people who want to use Curi.

## Installation

```sh
npm install --save curi-vue
```

### UMD

```html
<script src="https://unpkg.com/curi-vue@0.1.0/umd/curi-vue.js"></script>
<script type="text/javascript">
  const CuriPlugin = window.CuriVue;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of the `curi` UMD build, open https://unpkg.com/curi-vue/umd in your
browser and copy the link address for the `curi-vue.js` file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to `curi-vue.min.js`.

**Note:** If you are using a UMD script, you will have to include the `vue` script yourself.

## Usage

`curi-vue` exports a Vue plugin that you can use to add Curi support to a Vue application. The plugin is passed to Vue using the `use` method. Along with the plugin, you will need to pass your Curi configuration object.

```js
import CuriPlugin from 'curi-vue';

// ...

const config = createConfig(history, routes);
Vue.use(CuriPlugin, { config });
```

This will do two things. First, it will register a `curi-link` component with Vue. You can use that component to navigate within your application. Second, it makes your configuration a global Vue property, which you can then access as `Vue.Curi`.

### Rendering

While this is not the only way (I'm pretty new to Vue, so I'm sure that I am missing some optimizations), the following is how I would setup rendering for a Curi + Vue application.

```js
// 1. wait for the initial response to be resolved
config.ready().then(resp => {
  // 2. create the Vue app
  const vm = new Vue({
    el: '#app',
    // 3. initialize the data with the first response object
    data: {
      response: resp
    },
    // 4. Add a rendering function to the methods. This will be in charge
    //    of rendering your application using the response.
    methods: {
      render: function(h, resp) {
        const { body } = resp;
        return h(body, { params: resp.params });
      }
    },
    // 5. Add a render function to your Vue. This will call the rendering
    //    function that you defined above.
    render: function(h) {
      return this.render(h, this.response);
    }
  });

  // 6. Subscribe to the config and update vm.response whenever
  //    a new response is generated.
  config.subscribe(resp => {
    vm.response = resp;
  });
});
```
