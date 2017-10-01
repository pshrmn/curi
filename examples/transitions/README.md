# Transitions

[CodeSandbox demo](https://codesandbox.io/github/pshrmn/curi/tree/master/examples/transitions)

This experiment uses `react-transition-group` to animate navigation transitions, but it should be relatively straightforward to adapt this for other animation packages (e.g. `react-motion`).

All that this does is to render a `<CSSTransitionGroup>` around the response's `body`. The only other thing that you need to do is to set a key on the rendered component, which is necessary for `<CSSTransitionGroup>` to know which of its children are entering/leaving/staying. 

```js
function render(response) {
  return (
    <CSSTransitionGroup>
      <response.body key={response.location.pathname} />
    </CSSTransitionGroup>
  );
}
```
