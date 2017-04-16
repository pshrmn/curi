# `<Link>`

A `<Link>` allows you to navigate within your application. A `<Link>` will render an anchor element (`<a>`). However, when it is clicked, instead of reloading the page it will use your configuration object's `history` object to navigate.

Instead of providing a pathname, you just need to specify the name of the route you want to link to. Then, the pathname of the URI you want the component to link to will be automatically generated for you.

```js
<Link name='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>
```

This relies on your configuration object including the `pathname` addon (which is a default addon).

### props

#### name

The name of the route that you want to navigate to.

#### params

If the route that you want to navigate to (or any of its parents) include path parameters, you can specify them using the `params` prop.

#### to

While the `pathname` of the location to navigate to will be generated for you, this does not cover over location properties (`search`, `hash`, and `state`). You can provide these values using the `to` prop.

**Note:** You can also include a `pathname` property in the `to` object and it will overwrite the over generated from the `name` prop.
