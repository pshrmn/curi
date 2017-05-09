# curi-react-active

`curi-react-active` exports an `<Active>` component that will update its child element's `props` when it is "active".

## Installation

```
npm install --save curi-react-active
```

### UMD

```html
<script src="https://unpkg.com/curi-react-active@0.1.0/umd/curi-react-active.js"></script>
<script type="text/javascript">
  const Active = window.CuriReactActive;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of curi-react-active, open https://unpkg.com/curi-react-active/ in your
browser and manually navigate to the umd/curi-react-active.js file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to "curi-react-active.min.js"

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Active>`

The `<Active>` component lets you modify its `children` element's props. It takes a `merge` function as a prop, which you can use to modify the child element's props when the component is "active".

```js
function merge(props) {
  props.className = 'active';
  return props; 
}

const Users = (props) => (
  {
    props.users.map(u => (
      <Active
        key={u.id}
        name='User'
        params={u}
      >
        <User {...u} />
      </Active>
    ))
  }
)
```

This relies on the `active` addon from [`curi-addon-active`](../curi-addon-active) being added to your configuration object.

```js
import createActiveAddon from 'curi-active-addon';

const config = createConfig(history, routes, {
  addons: [createActiveAddon]
});
```

While not strictly a requirement, the `<Active>` relies on the `curi` and `curiResponse` context variables existing, so your application should have a `<Navigator>` (from [`curi-react-navigator`](../curi-react-navigator)) as an ancestor of your `<Active>` components in order to ensure that those exist.

### props

#### name

The name of the route to compare against the response object.

#### params

An object containing route parameters. These will be compared against the route params of the response object.

#### children

A React element that will have its props updated when the `<Active>` component is "active".

#### merge

A function that will modify the `children` element's props. It receives a `props` object as its argument and must return a `props` object.

#### partial

A boolean that defaults to `false`. When it is `true`, the "active" check will check the response's `partials` array in addition to its `name`. This allows you to style ancestor routes of the actually "active" route.
