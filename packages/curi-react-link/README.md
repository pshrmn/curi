# curi-react-link

## Installation

```
npm install --save curi-react-link
```

### UMD

```html
<script src="https://unpkg.com/curi-react-link@0.1.0/umd/curi-react-link.js"></script>
<!-- there is also a min script: curi-react-link.min.js -->
<script type="text/javascript">
  const Link = window.CuriReactLink;
</script>
```

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Link>`

A `<Link>` allows you to navigate within your application. A `<Link>` will render an anchor element (`<a>`). However, when it is clicked, instead of reloading the page it will use your configuration object's `history` object to navigate.

Instead of providing a pathname, you just need to specify the name of the route you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you.

```js
<Link to='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>
```

This relies on your configuration object including the `pathname` addon (which is a default addon).

### props

#### to

The name of the route that you want to navigate to.

#### params

If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the `params` prop.

#### details

While the `pathname` of the location to navigate to will be generated for you, this does not cover over location properties (`search`, `hash`, and `state`). You can provide these values using the `details` prop.

**Note:** You can also include a `pathname` property in the `details` object and it will overwrite the over generated from the `name` prop.
