# curi-react-clickable

[![npm][badge]][npm-link]

[badge]: https://img.shields.io/npm/v/curi-react-clickable.svg
[npm-link]: https://npmjs.com/package/curi-react-clickable

## Installation

```
npm install --save curi-react-clickable
```

### UMD

```html
<script src="https://unpkg.com/curi-react-clickable@0.1.0/umd/curi-react-clickable.js"></script>
<script type="text/javascript">
  const Clickable = window.CuriReactClickable;
</script>
```

The version number above may not always be accurate. To ensure that you are using the most
up to date version of `curi-react-clickable`, open https://unpkg.com/curi-react-clickable/ in your
browser and manually navigate to the umd/curi-react-clickable.js file. That will provide you
with the URI of the most recent release. There is also a minimized version of the bundle
if you change the file name in the URI to "curi-react-clickable.min.js"

**Note:** If you are using a UMD script, you will have to include `react` and `prop-types` scripts yourself.

## `<Clickable>`

`<Clickable>` provides a generic implementation of the [`<Link>`](../curi-react-link). You provide it with a component (a string for built-ins or a function for composite components) and `<Clickable>` will render that component with an `onClick` function that it will use to navigate within your application.


```js
<Clickable component='div' to='User' params={{ id: 16 }}>User 16</Clickable>
// <div onClick={(e) => { history.push('/user/16'); }>User 16</div>
```

This relies on your configuration object including the `pathname` addon (which is a default addon).

**Note:** You should be aware that there can be accessibility issues in web applications related to using non-anchor components for navigation. Generally speaking, in web applications you should just be using `<Link>`s. This does, however, provide a working generic solution for navigation in a React Native application. Also, the `<Clickable>` component does not use events, so for React web applications, you cannot call `event.preventDefault()` in the `onClick` function or use event modifiers (holding <kbd>ctrl</kbd>, <kbd>alt</kbd>, or the meta key while clicking) to modify the clicking behavior.

### props

#### component

The type of component that should be rendered.

#### to

The name of the route that you want to navigate to.

#### params

If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the `params` prop.

#### details

While the `pathname` of the location to navigate to will be generated for you, this does not cover over location properties (`search`, `hash`, and `state`). You can provide these values using the `details` prop.

**Note:** You can also include a `pathname` property in the `details` object and it will overwrite the over generated from the `name` prop.

#### active

The `active` prop gives you an opportunity to style the component rendered by the `<Clickable>` when it is "active". Being active means that the `<Clickable>`'s route parameters are the same as the current response's route parameters.

The `active` prop is an object with two properties. The first one, `merge` is required. The `merge` property must be a function. That function will receive the `props` that will be passed to the component as its argument. The `merge` function can modify these props however it likes and return the resulting props object.

```js
function mergeActive(props) {
  props.className = 'active';
  return props;
}

<Clickable
  component='div'
  to='Home'
  active={{ merge: mergeActive }}
>
  Home
</Clickable>
```

The second property of the `active` object is `partial`. By default, only `<Clickable>`s that match the response object's `name` can be considered "active". However, when `partial` is true, any parent routes can also be "active". This is done using the response object's `partials` array.

```js
<Clickable
  component='div'
  to='Users'
  active={{ partial: true, merge: mergeActive }}
>
  Users
</Clickable>
```

**Note:** If you use the `active` prop, you have to include the [`curi-addon-active`](../curi-addon-active) addon in your Curi configuration object. If you do not, an error will be thrown.

#### onClick

You can specify same function to be called prior to navigation using the `onClick` function. Unlike with the `<Link>` component, however, you cannot cancel the click in your `onClick` handler. If you are building a React web application and want this behavior, you should probably be using a `<Link>` instead.
