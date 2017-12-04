<template>
  <div>
    <h1>{{params.category}}</h1>
    <breadcrumbs name='Category' :params="params" />
    <p>List of products</p>
    <ul>
      <li v-for="product in data" :key="product.id">
        <curi-link to='Product' :params="linkParams(product.id)">
          {{title(product.name)}}
        </curi-link>
      </li>
    </ul>

  </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs';

  export default {
    name: 'contact-method',
    props: ['params', 'data'],
    methods: {
      title(name) {
        return this.$curi.config.addons.title('Product', { name });
      },
      linkParams(productID) {
        return { ...this.params, productID };
      }
    },
    components: { breadcrumbs: Breadcrumbs }
  };
</script>