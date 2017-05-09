# curi-react-redirect

## Installation

```
npm install --save curi-react-redirect
```

### UMD

```html
<script src="https://unpkg.com/curi-react-redirect@0.1.1/umd/curi-react-redirect.js"></script>
<script type="text/javascript">
  const Redirect = window.CuriReactRedirect;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of `curi-react-redirect`, open https://unpkg.com/curi-react-redirect/ in your
browser and manually navigate to the umd/curi-react-redirect.js file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to "curi-react-redirect.min.js"

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Redirect>`

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
