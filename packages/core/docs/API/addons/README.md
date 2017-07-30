# Addons

Addons allow you to register functions that interact with a route using the route's `name`.

Addons for a configuration are provided using the `addons` property of the `options` object.

```js
const config = createConfig(history, routes, {
  addons: [addonOne, addonTwo]
});
```

### [`pathname`](./pathname.md)

Curi provides one built-in (and always used) addon: `pathname`. This is used to generate a pathname string using a route's name (and providing any necessary params). Nested routes will also use their parent routes' paths to generate the full pathname.

Because the `pathname` addon is built-in, you do not need to pass it to the config using the `addons` array.
