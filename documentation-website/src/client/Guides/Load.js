import React from 'react';
import BaseGuide from '../components/BaseGuide';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from '@curi/react';
import { Section } from '../components/Sections';

export default ({ name }) => (
  <BaseGuide>
    <h1>{name}</h1>

    <p>
      In the code splitting guide, we used the preload property of routes. Routes also have a load
      property. The biggest difference between the two is that load is called every time a route
      matches, whereas preload is only called the first time a route matches.
    </p>

    <p>
      load is where you should perform any data loading for the route. We'll start a new
      application here, which is a basic recipe site. We want to have a route for a recipe list
      page as well as a route for specific recipes.
    </p>

    <PrismBlock lang='javascript'>
      {
`const routes = [
  {
    name: 'Recipe List',
    path: 'recipes',
    body: () => RecipeList
  },
  {
    name: 'Recipe',
    path: 'recipe/:id',
    body: () => Recipe
  }
];`
      }
    </PrismBlock>

    <p>
      Whenever the Recipe List route matches, we want to fetch a list of recipes from the server.
      When the Recipe route matches, we just want one specific recipe (using the id param from the
      path).
    </p>

    <p>
      The load function will be passed four arguments: the params object that contains variables
      parsed from the location's pathname, the location object used to match the route, 
      a modifiers object, and the object containing all of your Curi addons. The modifiers object has a
      few methods that you can call in order to modify the response object that will be generated. They
      are <IJS>fail</IJS>, <IJS>setStatus</IJS>, <IJS>setData</IJS> and <IJS>redirect</IJS>. Each is
      explained in more detail in the{' '}
      <Link to='Guide' params={{ slug: 'routes' }} details={{ hash: 'load'}}>all about routes</Link>
      {' '}guide. Here, we will use the last two: setData and redirect.
    </p>

    <p>
      First we will add a load function to our Recipe route. This function will make a request
      to our (fake) API. Then, we will call response.setData to attach our loaded data to the
      response.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  name: 'Recipe',
  path: 'recipe/:id',
  body: () => Recipe,
  load: (params, location, modifiers) => {
    return fakeAPI.getRecipe(params.id)
      .then(data => {
        modifiers.setData(data);
      });
  }
}`
      }
    </PrismBlock>

    <p>
      Now, when we navigate to /recipe/chocolate-chip-cookies, our load function will call the
      fake API function to load the recipe and set the loaded data for the response. That means
      that the data we load will be available on the generated response object as response.data.
    </p>

    <p>
      One possible downside to the implementation of load above is that we will be making requests
      to our API every time the route loads. To prevent this, you might want to add a data cache
      to your application. Using this, you can store the results of previous requests and use that
      for subsequent requests instead of having to request the data from the server again.
    </p>

    <PrismBlock lang='javascript'>
      {
`{
  name: 'Recipe List',
  path: 'recipes',
  body: () => RecipeList,
  load: () => {
    if (cache.has('recipes')) {
      return Promise.resolve(cache.get('recipes'));
    }

    return fakeAPI.getRecipes()
      .then(data => {
        cache.set('recipes', data);
        return data;
      });
  }
}`
        }
      </PrismBlock>

      <p>
        If at some point in time we decide that we want to change our URI pathname structure, we
        can also use the load function to redirect.
      </p>

      <p>
        By calling the modifier's redirect method, you can specify the URI that we should redirect
        to. As always, with Curi you aren't expected to have to manually generate pathnames. Instead,
        you can use <IJS>addons.pathname</IJS>.
      </p>

      <PrismBlock lang='javascript'>
        {
`{
  name: 'Old Recipe',
  path: 'r/:id',
  load: (params, location, modifiers, addons) => {
    const pathname = addons.pathname('Recipe', params);
    // destructure the current location to preserve
    // query/hash values
    modifiers.redirect({ ...location, pathname });
  }
}`
        }
      </PrismBlock>

      <Note>
        This does not actually perform a redirect. Instead, it will make it so
        that the emitted response is a "redirect" response, with a redirectTo property you can use
        to redirect manually. Below is an example of a render function (passed to a{' '}
        <Cmp>Navigator</Cmp>) that renders a <Cmp>Redirect</Cmp>
        {' '}when the response contains a redirectTo value.
      </Note>

      <PrismBlock lang='javascript'>
        {
`function renderFunction(response) {
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }
  // ...
}`
        }
      </PrismBlock>

      <p>
        load is a great place to do any route setup prior to actually rendering the route. Please
        remember, however, that your application will not be re-rendering until after the load
        function has resolved. If you have a long running load function, you may wish to implement
        some sort of loading display. The prefetching data example shows one approach to how to do
        this.
      </p>
  </BaseGuide>
);
