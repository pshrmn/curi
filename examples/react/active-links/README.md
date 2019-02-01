# Active links

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/active-links)

You may want to style a link differently when it is "active" (based on the current response object). You can do so using the `active` prop of `<Link>`.

The `active` prop must be an object with a `merge` function as one of its properties. The `merge` function is responsible for updating the props that will be passed to the anchor (`<a>`).

You can also pass a `partial` property to the `active` object. `partial` should be a boolean, and when it is `true`, that means that if the `<Link>`'s `to` property is in the response's `partials` array, it can be "active" if its `params` match the resposne's `params`.

```js
const merge = (props) => {
  props.className = 'active';
  return props;
}

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link name='Home' active={{ merge }}>Home</Link>
      </li>
      <li>
        <Link name='Contact' active={{ merge, partial: true }}>Contact</Link>
        <ul>
          <li>
            <Link
              name='Method'
              active={{ merge }}
              params={{ method: 'phone' }}
            >
              By Phone
            </Link>
          </li>
          <li>
            <Link
              name='Method'
              active={{ merge }}
              params={{ method: 'email' }}
            >
              By Email
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);
```
