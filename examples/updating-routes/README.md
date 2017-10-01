# Updating Routes

[CodeSandbox demo](https://codesandbox.io/github/pshrmn/curi/tree/master/examples/updating-routes)

Typically, you will define all of your application's routes in a single routes array. However, you may want to only make some routes accessible to the user. One approach to do this would be to have each route check if the user has permission to view it and display a 404 page if they cannot. Another approach would be to change the array of routes that are actually available to the user. This way, when the user attempts to visit a valid route that they are not allowed to view, they will just automatically see a 404 page.

This approach isn't only for authentication. Another use case for this would be if your application has different routes for different languages. When the user selects a new language, you could update your Curi configuration with the appropriate routes array.
