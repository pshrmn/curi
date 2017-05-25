# Basic Curi + Vue Example

While Vue does have an official router, this project shows how you _could_ use Curi as the router for a Vue project instead. It uses `<curi-link>` component provided by the the `curi-vue` package. Unlike the React examples, which use a `<Navigator>` component to automatically subscribe, here we are manually subscribing to navigation changes. We keep a reactive `response` object on our view model in order to automatically re-render when a new response is generated.

**Note:** If you are experienced with Vue, you will probably notice that the layout of this application is not optimal. That is a just testament to my lack of familiarity with Vue and hopefully will be fixed as I learn the best practices. Please feel free to point out any issues and I will update this example.
