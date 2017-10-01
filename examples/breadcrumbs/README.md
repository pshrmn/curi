# Breadcrumbs

[CodeSandbox demo](https://codesandbox.io/s/github/pshrmn/curi/tree/master/examples/breadcrumbs)

You can easily generate breadcrumb navigation links for the current route using the `curi-addon-ancestors` package. This allows you to get the route names for the current route. Using these names you can render a `<Link>` for each one (passing the parameters if necessary).

This example also introduces a simple `title` addon that allows you to specify what the title for a route should be (given a params object). This can be useful for generating dynamic link text.
