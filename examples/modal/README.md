# Modal experiment

[CodeSandbox demo](https://codesandbox.io/embed/lO25PD24J)

This is largely a clone of the React Router v3 [Pinterest example](https://github.com/ReactTraining/react-router/blob/v3/examples/pinterest/app.js).

A `<Cacher>` component is used, which will store the previous `props.children` element inside of `componentWillReceiveProps` if the new location is a "modal" location.

This isn't necessarily a perfect solution, but it works well enough as a demonstration to get the idea across.

**Note:** You will need to have a server to run this because it relies on `location.state`, which does not exist with hash histories. This project is setup to use `express`, so if you called `npm install`, you should be able to just call `npm start` to launch the server.
