import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { InlineJS as IJS } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section } from '../components/Sections';

const TutorialList = () => (
  <BaseTutorial>
    <h1>Part 1: Introduction to Curi</h1>
    <p>
      In this set of tutorials, we will be building a single page application from
      scratch using Curi. The application will be a website for a book store.
      Users will be able to browse through books and "purchase" ones that they want.
    </p>
    <Note>
      We will only be building the front end. Any time that we would need to add back
      end code for a "real" website, we will just simulate this with a fake API.
    </Note>

    <Section
      title='What is Curi?'
      id='what'
    >
      <p>
        Before we get started, let's quickly define what Curi <em>is</em> and <em>is not</em>.
      </p>
      <ol>
        <li>
          Curi is an asynchronous single page application router.
          <ol style={{ listStyleType: 'upper-roman' }}>
            <li>
              Being a single page application router means that with Curi, you can navigate
              to pages within your application without sending requests to the server.
            </li>
            <li>
              Being asynchronous means that you can load data (and code) prior to rendering
              a new page instead of rendering loading screens while you wait for data to be
              fetched.
            </li>
          </ol>
        </li>
        <li>
          Curi is response based. Whenever navigation happens, Curi will create a new
          response object by matching itsroutes to the new location. The response will
          then be emitted so that the application can re-render using the new response.
        </li>
        <li>
          Curi is not framework specific. It does not matter to Curi how you render your
          application; Curi is only concerned with navigation and route matching. That said,
          there are a couple official framework specific packages (e.g. <IJS>@curi/react</IJS>
          {' '}and <IJS>@curi/vue</IJS>) that provide integration with Curi, but these are not
          required for you to be able to use Curi.
        </li>
      </ol>
    </Section>

    <Section
      title='Prerequisites'
      id='prereqs'
    >
      <p>
        These tutorials aim to be quite easy to pick up without a lot of prior
        knowledge required. However, there are a couple things you should keep
        in mind.
      </p>
      <ol>
        <li>
          You should be familiar with JavaScript. We will be using ES6+
          syntax (module <IJS>import</IJS>/<IJS>export</IJS>, arrow functions,
          Promises, etc.). You don't have to be a JavaScript master, but it still
          helps to be familiar with ES6.
        </li>
        <li>
          If you plan to follow along locally, you need to have Node/NPM installed.
        </li>
        <li>
          Again, if you plan to follow along locally, you should be comfortable with
          basic terminal (command line) usage. Nothing crazy, just commands
          like <IJS>cd</IJS>, <IJS>touch</IJS>, <IJS>mkdir</IJS> and running{' '}
          <IJS>npm</IJS> commands.
        </li>
        <li>
          You should be familiar with either React or Vue. These aren't the only
          frameworks that you can use with Curi, but they <em>are</em> the only ones
          that this tutorial is (currently) written for.
        </li>
      </ol>
    </Section>

    <Section
      title='Next'
      id='next'
    >
      <p>
        Let's dive in to the tutorials with{' '}
        <Link to='Tutorial' params={{ name: '02-setup' }}>Part 2: Setting up Curi</Link>.
      </p>
    </Section>
  </BaseTutorial>
);

export default TutorialList;
