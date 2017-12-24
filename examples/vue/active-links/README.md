# Active links

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/vue/active-links)

You may want to style a link differently when it is "active" (based on the current response object). You can do so using the `active` prop of `<Link>`.

The `active` prop must be an object with a `merge` function as one of its properties. The `merge` function is responsible for updating the props that will be passed to the anchor (`<a>`).

You can also pass a `partial` property to the `active` object. `partial` should be a boolean, and when it is `true`, that means that if the `<Link>`'s `to` property is in the response's `partials` array, it can be "active" if its `params` match the resposne's `params`.

```html
<template>
  <curi-link to='Home' :active="{ merge }">Home</curi-link>
</template>
<script>
  const merge = (props) => {
    props.class = 'active';
    return props;
  }
  
  export default {
    methods: { merge }
  };
</script>
```
