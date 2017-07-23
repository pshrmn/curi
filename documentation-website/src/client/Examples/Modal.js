import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'modal';
const name = 'Modal';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        This example mimics the way that Pinterest works. Whether or not this is a good design pattern is
        up for debate, but at the very least it is helpful to see one way that you can do this with Curi.
      </p>

      <p>
        If you are unfamiliar with the Pinterest model, this is how it works: when you navigate to a "modal
        route" from within the application, the route will open in a modal window (preserving the background
        content from the page that the user navigated from). However, if you load the same location manually,
        it will render the location in a full window.
      </p>

      <p>
        You will have to take a number of things into consideration when implementing this:
      </p>

      <p>
        The first is how to know whether to render a modal window or a full page. The easiest way to do 
        his is to use <InlineJS>location.state</InlineJS> to attach a value to the location that indicates that
        you want to render a modal. State is persistent across refreshes and the user clicking the browser's
        forward/back buttons, so you will also have to take that into consideration.
      </p>

      <p>
        Second, you will also have to implement some mechanism to render the base layer (under the modal) using
        the previous location. In a React application, you can do this by storing the previous{' '}
        <InlineJS>props.children</InlineJS>.
      </p>

      <p>

      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo src='https://codesandbox.io/embed/lO25PD24J' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/modal'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
