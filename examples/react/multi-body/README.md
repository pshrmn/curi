# Multi body example

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/multi-body)

Sometimes, you may want to have multiple components attached to a route. When this is the case, all you have to do is set an object instead of the specific component.

```js
import { HomeMenu, Home } from './components/Home';

const routes = [
  {
    name: 'Home',
    match: {
      response({ set }) {
        set.body({
          main: Home,
          menu: HomeMenu
        });
      }
    }
  }
];
```
