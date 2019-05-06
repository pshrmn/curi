# Breadcrumbs (Vue)

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/vue/breadcrumbs)

You can easily generate breadcrumb navigation links for the current route using the `ancestors` route interaction. This allows you to get the names of ancestors of the current route. Using these names you can render a `<Link>` for each one (passing the parameters if necessary).

This example also introduces a simple `title` addon that allows you to specify what the title for a route should be (given a params object). This can be useful for generating dynamic link text.
