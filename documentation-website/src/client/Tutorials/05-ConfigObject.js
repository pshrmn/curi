import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 5: The Curi Configuration Object</h1>
    <p>
      Curi uses a centralized configuration object to handle routing. Essentially, whenever
      the location changes (and when your application first loads), the configuration object
      will iterate over your routes to find one that matches the new location. Then, it will
      use that route to generate a response object. This response contains a bunch of properties
      that are useful for rendering your application. 
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Creating a Curi configuration object using our routes and
          history object.
        </li>
        <li>
          Learning about some of the properties of the configuration
          object and how Curi works.
        </li>
      </ul>
    </div>
    <Section
      title='Installation'
      id='installation'
      type='aside'
    >
      <p>
        If you haven't already installed it, now is the time that you finally need to have{' '}
        <IJS>@curi/core</IJS> installed.
      </p>
      <PrismBlock lang='bash'>
        {
`npm install @curi/core`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Creating our Config'
      id='create'
    >
      <p>
        <IJS>@curi/core</IJS> only has a single, default export, which is a function that will
        create a configuration object. In this tutorial, we will import it as <IJS>createConfig</IJS>
        {' '}(of course, you can name it whatever you like).
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from '@curi/core';`
        }
      </PrismBlock>
      <p>
        <IJS>createConfig</IJS> can take three arguments. The first two arguments are required
        while the third is not.
      </p>
      <ol>
        <li>
          <IJS>history</IJS> - The first argument to pass to <IJS>createConfig</IJS> is a Hickory
          history object.
        </li>
        <li>
          <IJS>routes</IJS> - The second argument is an array of route objects.
        </li>
        <li>
          <IJS>config</IJS> - The third argument is an object that contains additional configuration
          data. We will not be using this object in this tutorial.
        </li>
      </ol>
      <p>
        Using the routes that we defined in the <Link to='Tutorial' params={{ name: '03-routes' }}>
        Routes Tutorial</Link> as well as the Hickory history object, we are ready
        to create our configuration object.
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from '@curi/core';
import Browser from '@hickory/browser';

import routes from './routes';

const history = Browser();
const config = createConfig(history, routes);`
        }
      </PrismBlock>
    </Section>

    <p>
      There are two more things we should cover before we're ready to render. The first is how
      your application knows that navigation has happened so that it can re-render. The second
      is something that we haven't seen any evidence of it yet, but will become important soon:
      Curi is an <strong>asynchronous</strong> router.
    </p>

    <Section
      title='Subscriber Model'
      id='subscriber'
      type='aside'
    >
      <p>
        In order to let your application know about location changes, Curi uses a subscriber model.
        Whenever a location change happens, Curi will create a new response and then emit this
        response to all of its subscribed methods. Using <IJS>config.subscribe</IJS>, we can give
        Curi a subscriber method to call when a new response has been created.
      </p>
      <p>
        What does a subscriber function look like? It can take two arguments. The first will be
        the <IJS>response</IJS> object generated for the new location. The second is the{' '}
        <IJS>action</IJS>type from the navigation (<IJS>'PUSH'</IJS>, <IJS>'POP'</IJS>, and{' '}
        <IJS>'REPLACE'</IJS>).
      </p>
      <PrismBlock lang='javascript'>
        {
`function responseLogger(response, action) {
  console.log("RESPONSE:", response);
  console.log("ACTION", action)
}
config.subscribe(responseLogger);`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Ready or Not'
      id='ready'
      type='aside'
    >

      <p>
        Curi being asynchronous means that we can run async code (e.g. code splitting using <IJS>import()</IJS>
        {' '}or data fetching using <IJS>fetch()</IJS>) prior to emitting a response. This is really convenient,
        but it can also be a gotcha if you are not aware of it.
      </p>
      <p>
        The reason that you need to be aware of it is because of what happens when you create your configuration
        object. When you do this, Curi will begin creating a response for you using the initial location (in
        a browser, this will be the current URI). However, we will not be able to access the initial response
        right after we create our config object. Instead, we will need to use the <IJS>config.ready</IJS> method
        to wait for our initial response to be ready.
      </p>
      <PrismBlock lang='javascript'>
        {
`const config = createConfig(history, routes);
config.ready().then(resp => {
  // this function won't be called until the Promise returned
  // by config.ready() has resolved with our response object
  console.log("Houston, we have a response", resp);
});
// since Curi is async, other parts of our code can continue
// to run while we wait for the response to be ready
console.log("Look, Ma, no response yet!");`
        }
      </PrismBlock>
      <p>
        Calling <IJS>config.ready()</IJS> returns a <IJS>Promise</IJS> that resolves with our response object.
        It isn't absolutely mandatory that you use <IJS>config.ready</IJS>, but if you do not, you will
        need to handle rendering when the response is <IJS>undefined</IJS>.
      </p>
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        With our configuration object created, we are finally ready to render.
        Now, we are at a bit of a fork in the road. While most of the tutorials
        apply to everyone, the next tutorial is framework specific.
      </p>
      <p>
        If you are following along using React, continue on to{' '}
        <Link to='Tutorial' params={{ name: '06-views-react' }}>Part 6: Views (React)</Link>
      </p>
      <p>
        If you are following along using Vue, you instead you should go to{' '}
        <Link to='Tutorial' params={{ name: '06-views-vue' }}>Part 6: Views (Vue)</Link>
      </p>
    </Section>
  </BaseTutorial>
);
