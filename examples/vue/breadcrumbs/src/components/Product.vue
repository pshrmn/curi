<template>
  <div>
    <breadcrumbs name='Product' :params="$curi.response.params" />
    <div v-if='$curi.response.error'>
      {{$curi.response.error}}
    </div>
    <div v-else>
      <h1>{{$curi.response.data.name}}</h1>
      <p>
        {{$curi.response.data.description}}
      </p>
    </div>
  </div>
</template>

<script>
  import Breadcrumbs from './Breadcrumbs';
  export default {
    name: 'product',
    components: { breadcrumbs: Breadcrumbs }
  }
</script>