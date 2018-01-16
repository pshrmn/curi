# Redux

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/react/redux)

Redux is straightforward to integrate with a `curi` project.

You will most likely want to export your `store` from its own module so that it can be imported throughout your project. Then, any routes that need data to be loaded prior to rendering would dispatch to the store from their `load` function.

```js
import store from './store';
import setData from './actions';
const routes = [
  // ...,
  {
    name: 'Data',
    path: 'data/:id'
    value: Data,
    load: (resp) => {
      const { id } = resp.params;
      // get the data associated with the id
      return fetch(`/api/data/${id}`)
        .then(data => {
          store.dispatch(setData(data));
        });
    }
  }
  // ...
];
```
