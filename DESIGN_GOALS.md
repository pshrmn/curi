# Design Goals

1. You should never have to create a URI manually in a Curi project. If you want to link to a route, its name (and any parameters from the route's `path`) should be enough. This means that:
   1. Links should always be to valid routes. If you try to link to a non-existent route, you will get a console warning.
   2. If you decide to change a route's path, you don't have to change all of your links. The only other change you would probably want to make is to create a route with the old path that redirects to the new path so that external links to your project do not break.
   3. You can also attach other behavior to routes simply by knowing their name. This is demonstrated with the [`active`](#curi-addon-active) and [`prefetch`](#curi-addon-prefetch) addons.
2. By forcing you to use Promises for asynchronous code in routes, projects that use Curi should be more consistent. Promises are not perfect, but they make resolving async code internally very simple (hurray, `Promise.all`). Ideally, forcing Promises should mean that:
   1. Your code should end up a little cleaner than it would be if you were using callbacks. While Promises can end up just as long as callback waterfalls, their structure should make them easier to read. Just remember to `catch` any errors so that they don't get swallowed!
   2. Code splitting should work out of the gate. `import()` returns a Promise, so getting code splitting setup is very simple.
3. Response objects allow you to render your application however you see fit. A response is just an object with a few properties to let you know the location and which of your routes matches that location. How you use that information for rendering is up to you.
   1. The `value`/`call` properties of a route are great ways to attach extra information to a response for a given route. Similarly, if you are using a `load` function, you can [tie loaded data](docs/tutorials/06-route-loading.md) to the response object for easy reference.
