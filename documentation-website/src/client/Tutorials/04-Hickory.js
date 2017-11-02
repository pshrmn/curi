import React from 'react';
import { Link } from '@curi/react';

import BaseTutorial from './base/BaseTutorial';
import { TutorialBranch } from '../components/TutorialBranch';
import { InlineJS as IJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section, Subsection } from '../components/Sections';

export default () => (
  <BaseTutorial>
    <h1>Part 4: Hickory</h1>
    <p>
      One thing that all modern JavaScript routers have in common is that
      they use the{' '}
      <a href='https://developer.mozilla.org/en-US/docs/Web/API/History_API'>
      History API</a> to perform in-app navigation. Curi uses a package called{' '}
      <a href='https://github.com/pshrmn/hickory'>Hickory</a>, which will
      interact with the History API for us.
    </p>
    <div>
      <p>
        In this tutorial, we will be doing the following:
      </p>
      <ul>
        <li>
          Learning about the Hickory package and location objects.
        </li>
        <li>
          Creating the Hickory history object for our website.
        </li>
      </ul>
    </div>
    <TutorialBranch name='04-hickory' />
    <Section
      title='About Hickory'
      id='about'
    >
      <p>
        Hickory creates "history" objects that allow you to navigate between
        locations within your application. It interacts with the browser for you
        so that when you navigate to a new location, the URI in the address bar
        is also updated. Hickory also detects and updates when you use the browser's
        forward and back buttons.
      </p>
      <p>
        Hickory uses a subscriber model so that whenever navigation to a new location
        happens, a subscribed method will be called. Curi will subscribe to your
        history object to create new responses whenever the location changes.
      </p>
    </Section>
    <Section
      title='Choose your own Hickory'
      id='choose'
    >
      <p>
        Hickory is split into three packages: <IJS>@hickory/browser</IJS>,{' '}
        <IJS>@hickory/hash</IJS>, and <IJS>@hickory/in-memory</IJS>. You can read about
        the differences between them and figure out which is right for you in this{' '}
        <a href='https://github.com/pshrmn/hickory/blob/master/docs/about/choosing.md'>
        Choosing Your History Type</a> guide.
      </p>
      <p>
        We will be using the browser history (<IJS>@hickory/browser</IJS>). This is
        because 1. our application will run in the browser and 2. our site is backed
        by a server that can handle dynamic requests.
      </p>
    </Section>
    <Section
      title='Installation'
      id='installation'
    >
      <p>
        If you have following along with these tutorials since the{' '}
        <Link to='Tutorial' params={{ name: '02-setup' }}>setup tutorial</Link>,
        then you should already have the <IJS>@hickory/browser</IJS> package installed.
        If not, you should install it now.
      </p>
      <PrismBlock lang='bash'>
        {
`npm install @hickory/browser`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Making History'
      id='making-history'
    >
      <p>
        In order to use Hickory in our application, we just need to import it
        and call the imported function. There are a number of configuration options
        that you can provide, but we don't need any of those right now. If you want
        to learn more about those, please check out the{' '}
        <a href='https://github.com/pshrmn/hickory/tree/master/docs'>Hickory documentation</a>.
      </p>
      <PrismBlock lang='javascript'>
        {
`import Browser from '@hickory/browser';
const history = Browser();`
        }
      </PrismBlock>
    </Section>
    <Section
      title='Location'
      id='hickory-location'
      type='aside'
    >
      <p>
        Hickory (and Curi in turn) use location objects for navigation and route
        matching. These are simply JavaScript objects with a few properties to
        identify a location.
      </p>
      <p>
        When you load a page, Hickory will parse the URI to generate a location's{' '}
        <IJS>pathname</IJS>, <IJS>query</IJS>, and <IJS>hash</IJS> properties. The
        pathname property of a location is the only thing that <IJS>path-to-regexp</IJS>
        {' '}uses for matching locations.
      </p>
      <PrismBlock lang='javascript'>
          {
`// uri = '/products/socks?color=black#description'
{
 pathname: '/products/socks',
 query: 'color=black',
 hash: 'description',
 key: '1.0',
 rawPathname: '/products/socks'
}`
        }
      </PrismBlock>
      <p>
        Besides the properties parsed from the URI, locations also have
        a <IJS>key</IJS> property that can be used to uniquely identify a
        location, a <IJS>rawPathname</IJS> property (you probably won't need
        this, but it is useful when dealing with pathnames that contain encoded
        characters), and sometimes <IJS>state</IJS> which is data tied to a
        location but not part of the URI.
      </p>
      
      <p>
        Hickory actually navigates between locations, not URIs. The only time
        that Curi/Hickory uses URIs is to set the <IJS>href</IJS> attribute of
        anchors and to update the string displayed in the address bar (using the
        History API).
      </p>

      <p>
        For now, that will cover all that you need to know about Hickory. For
        basic usage, you should never have to think about it except for creating
        your history object.
      </p>
    </Section>
    <Section
      title='Next'
      id='next'
    >
      <p>
        With both our routes and history object, we are now ready for{' '}
        <Link to='Tutorial' params={{ name: '05-config' }}>Part 5</Link>, where we
        will create the core of Curi, our configuration object. 
      </p>
    </Section>
  </BaseTutorial>
);
