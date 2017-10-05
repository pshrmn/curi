<template>
  <div>
    <breadcrumbs name='Product' :params="params" />
    <h1>{{data.name}}</h1>
    <p>
      {{data.description}}
    </p>
  </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs';
  export default {
    name: 'product',
    props: ['data', 'params'],
    components: { breadcrumbs: Breadcrumbs }
  }
</script>