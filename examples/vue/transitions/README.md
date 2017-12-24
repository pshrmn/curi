# Transitions

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/vue/transitions)

Transition with Curi and Vue are simple, you just need to use the `<transition>` element. There are a couple of things to keep in mind:

1. If you want to have the entering and leaving components transition at the same time, `position: absolute` is your friend.
2. If your app can have transitions between the same route (i.e. any route with params), you will want to attach a `key` to your components.
```html
<transition name="component-fade">
  <component :key="$curi.response.location.key" :is="cmp" />
</transition>
```
