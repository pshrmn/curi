# `<Redirect>`

The `<Redirect>` component lets you "render" a redirect. After the `<Redirect>` component has mounted, it will call the appropriate `history` method to navigate to a new URI.

`<Redirect>` works very similarly to a `<Link>`, except instead of having navigation triggered by a click, with a `<Redirect>` the navigation will happen automatically just by rendering the component.

```js
<Redirect name='Home' />
```

### props

#### `name`

The name of the route that should be used to generate the pathname of the URI to navigate to.

#### `params`

Any path params of the route specified with the `name` prop (or the params for any of its ancestor routes).

#### `to`

Additional URI properties to include when generating the URI to redirect to (`search`, `hash`, `state`).
