# curi-react-link

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-react-link.svg
[npm-link]: https://npmjs.com/package/curi-react-link

## Installation

```
npm install --save curi-react-link
```

### Script

If you wish to use `curi-react-link` through a `<script>` tag, there is a version available through unpkg.com.

```html
<script src="https://unpkg.com/curi-react-link@0.4.1/dist/curi-react-link.js"></script>
<script type="text/javascript">
  const Link = window.CuriReactLink;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most up to date version of the `curi-react-link` script build, open https://unpkg.com/curi-react-link/dist in your browser and copy the link address for the `curi-react-link.js` file. That will provide you with the URI of the most recent release.

**Note:** If you are using the above script, you will have to include `react` and `prop-types` scripts yourself.

## `<Link>`

A `<Link>` allows you to navigate within your application using an anchor element (`<a>`). When the rendered element is clicked, instead of reloading the page it will use your configuration object's `history` object to navigate.

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

#### anchor

By default, when you render a `<Link>`, an anchor element will be rendered (`React.createElement('a', ...)`). However, you can provide your own component to be rendered instead. This can be useful for using styled components to navigate.

**Warning:** You can provide any component that you want, but you should stick with an anchor (or a component that renders an anchor). There are accessibility issues that will occur when you use other DOM elements as links. The `component`'s prop type is `func` in an attempt to discourage you from making your link render a `button`, `div`, `span`, etc. You can do 


#### active

The `active` prop gives you an opportunity to style the `<a>` rendered by the `<Link>` when it is "active". Being active means that the `<Link>`'s route parameters are the same as the current response's route parameters.

The `active` prop is an object with two properties. The first one, `merge` is required. The `merge` property must be a function. That function will receive the `props` that will be passed to the `<a>` as its argument. The `merge` function can modify these props however it likes and return the resulting props object.

```js
function mergeActive(props) {
  props.className = 'active';
  return props;
}

<Link to='Home' active={{ merge: mergeActive }}>Home</Link>
```

The second property of the `active` object is `partial`. By default, only `<Link>`s that match the response object's `name` can be considered "active". However, when `partial` is true, any parent routes can also be "active". This is done using the response object's `partials` array.

```js
<Link to='Users' active={{ partial: true, merge: mergeActive }}>Users</Link>
```

**Note:** If you use the `active` prop, you have to include the [`curi-addon-active`](../curi-addon-active) addon in your Curi configuration object. If you do not, an error will be thrown.
