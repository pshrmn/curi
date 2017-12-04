import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch, CompleteBranch } from './base/Branch';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 5: The Curi Configuration Object</h1>
    <p>
      Curi uses a centralized configuration object to handle routing.
      Essentially, whenever the location changes (and when your application
      first loads), the configuration object will iterate over your routes to
      find one that matches the location. Then, it will use that route to
      generate a response object. This response contains a bunch of properties
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
    <TutorialBranch name='05-config' />
    <Section
      title='Installation'
      id='installation'
      type='aside'
    >
      <p>
        If you skipped the setup, you should install <IJS>@curi/core</IJS> now.
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
        <IJS>@curi/core</IJS> only has a single, default export, which is
        a function that will create a configuration object. In this tutorial,
        we will import it as <IJS>createConfig</IJS> (of course, you can name
        it whatever you like).
      </p>
      <PrismBlock lang='javascript'>
        {
`import createConfig from '@curi/core';`
        }
      </PrismBlock>
      <p>
        <IJS>createConfig</IJS> can take three arguments; the first two arguments
        are required while the third is not.
      </p>
      <ol>
        <li>
          <IJS>history</IJS> - The first argument to pass to <IJS>createConfig</IJS>
          {' '}is a Hickory history object.
        </li>
        <li>
          <IJS>routes</IJS> - The second argument is an array of route objects.
        </li>
        <li>
          <IJS>config</IJS> - The third argument is an object that contains additional
          configuration data. We will not be using this object in this tutorial.
        </li>
      </ol>
      <p>
        Using the routes that we defined in the{' '}
        <Link to='Tutorial' params={{ name: '03-routes' }}>Routes Tutorial</Link>
        {' '}and the{' '}
        <Link to='Tutorial' params={{ name: '04-hickory' }}>Hickory history object</Link>,
        we are ready to create our configuration object.
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

    <Section
      title='Subscriber Model'
      id='subscriber'
      type='aside'
    >
      <p>
        In order to let your application know about location changes, Curi uses
        a subscriber model. Whenever a location change happens, Curi will create a
        new response and then emit this response to all of its subscribed functions.
        These subscribed functions are called response handlers since they handle
        the new respond. Using <IJS>config.respond</IJS>, we can give Curi a
        response handler to call when a new response has been created.
      </p>
      <p>
        What does a response handler function look like? It can take two arguments. The
        first will be the <IJS>response</IJS> object generated for the new location.
        The second is the <IJS>action</IJS> type from the navigation (<IJS>'PUSH'</IJS>,
        <IJS>'POP'</IJS>, and <IJS>'REPLACE'</IJS>).
      </p>
      <PrismBlock lang='javascript'>
        {
`function responseLogger(response, action) {
  console.log("RESPONSE:", response);
  console.log("ACTION", action)
}
config.respond(responseLogger);`
        }
      </PrismBlock>
      <p>
        <IJS>curi.respond</IJS> will return a function that you can use to stop
        responding to new responses.
      </p>
      <PrismBlock lang='javascript'>
        {
`function responseLogger(response, action) {
  console.log("I will be called for every response until I unsubscribe");
}
const stopResponding = config.respond(responseLogger);
// any navigation that happens now will be logged
// ...
stopResponding();
// after unsubscribing, any new navigation will not be logged`
        }
      </PrismBlock>
      <p>
        While most response handlers should be subscribers (that is to say, you want them to
        be called every time a new response is generated), you might sometimes want to only
        call a response handler once. For example, a response handler might be a "ready"
        function that you only want called once you know that a response exists. To do
        that, you can use the second argument to <IJS>config.respond</IJS>, which is an
        options object. When the <IJS>once</IJS> object is <IJS>true</IJS>, then that
        response handler will only be called one time.
      </p>
      <PrismBlock lang='javascript'>
        {
`function responseLogger(response, action) {
  console.log("I will only be called once");
}
config.respond(responseLogger, { once: true });`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Review'
      id='review'
    >
      <CompleteBranch name='05-config-complete' />
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
        <Link to='Tutorial' params={{ name: '06-pages-react' }}>Part 6: React Pages</Link>
      </p>
      <p>
        If you are following along using Vue, you instead you should go to{' '}
        <Link to='Tutorial' params={{ name: '06-pages-vue' }}>Part 6: Vue Pages</Link>
      </p>
    </Section>
  </BaseTutorial>
);
