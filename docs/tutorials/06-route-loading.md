# Route Loading Tutorial

In the [previous tutorial](./05-code-splitting.md), we use the `preload` property of routes. Routes also have a `load` property. The biggest difference between the two is that `load` is called every time a route matches, whereas `preload` is only called the first time a route matches.

`load` is where you should perform any data loading for the route. We'll start a new application here, which is a basic recipe site. We want to have a route for a recipe list page as well as a route for specific recipes.

```js
const routes = [
  {
    name: 'Recipe List',
    path: 'recipes',
    value: RecipeList
  },
  {
    name: 'Recipe',
    path: 'recipe/:id',
    value: Recipe
  }
];
```

Whenever the `Recipe List` route matches, we want to fetch a list of recipes from the server. When the `Recipe` route matches, we just want one specific recipe (using the `id` param from the path).

The `load` function will be passed an internal `ResponseCreator` object. The `ResponseCreator` will create the response object that is emitted to subscribers. The `ResponseCreator` has a few methods that you can call in order to modify the response object that will be generated. These are covered in more detail in the [response/ResponseCreator documentation](../../packages/curi/docs/API/response.md). Here, we will cover just one of these methods: `setData`.

First we will add a `load` function to our `Recipe` route. This function will make a request to our (fake) API. Then, we will call `response.

```js
{
  name: 'Recipe',
  path: 'recipe/:id',
  value: Recipe,
  load: (respCreator) => {
    return fakeAPI.getRecipe(respCreator.params.id)
      .then(data => {
        respCreator.setData(data);
      });
  }
}
```

Now, when we navigate to `/recipe/chocolate-chip-cookies`, our `load` function will call the fake API function to load the recipe and set the loaded data for the response. That means that the data we load will be available on the generated response object as `response.data`.

One possibly downside to the implementation of `load` above is that we will be making requests to our API every time the route loads. To prevent this, you might want to add a data cache to your application. Using this, you can store the results of previous requests and use that for subsequent requests.

```js
{
  name: 'Recipe List',
  path: 'recipes',
  value: RecipeList,
  load: (respCreator) => {
    if (cache.has('recipes')) {
      return Promise.resolve(cache.get('recipes'));
    }

    return fakeAPI.getRecipes()
      .then(data => {
        cache.set('recipes', data);
        return data;
      });
  }
  }
}
```

If at some point in time we decide that we want to change our URI pathname structure, we can also use the `load` function to redirect.

By calling the `ResponseCreator`'s `redirect` method, you can specify the URI that we should redirect to. 

```js
{
  name: 'Old Recipe',
  path: 'r/:id',
  load: (respCreator) => {
    respCreator.redirectTo(`/recipe/${id}`);
  }
}
```

Please note that this does not actually perform a redirect. Instead, it will make it so that the emitted response is a "redirect" response, with a `redirectTo` property you can use to redirect manually. Below is an example of a render function (passed to a `<Navigator>`) that renders a `<Redirect>` when the response contains a `redirectTo` value.

```js
function renderFunction(response) {
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }
  // ...
}
```

`load` is a great place to do any route setup prior to actually rendering the route. Please remember, however, that your application will not be re-rendering until after the `load` function has resolved. If you have a long running `load` function, you may wish to implement some sort of loading display. The [prefetching data example](../../examples/prefetch-data) shows one approach to how to do this.

