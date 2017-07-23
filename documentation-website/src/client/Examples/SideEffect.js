import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'side-effect';
const name = 'Side Effect';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Side effects are pretty straightforward. Once a response has completed (any preload and load functions
        have resolved), the response's properties are used to create a JavaScript object. Then, any subscribed
        functions are called and passed that JavaScript object as their argument. Between those two steps, side
        effect functions can be run. They receive the new response as well as the action type used to trigger
        the navigation (POP, PUSH, or REPLACE).
      </p>

      <p>
        A side effect function just does something using its arguments. It is basically a subscriber, but a
        permanent one (cannot be removed).
      </p>

      <p>
        You pass any side effect functions that you want to use to the <InlineJS>createConfig</InlineJS> call,
        using the <InlineJS>sideEffects</InlineJS> property of the options object.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createConfig from 'curi';
import mySideEffect from './mySideEffect';

const config = createConfig(history, routes, {
  sideEffects: [mySideEffect]
});`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo src='https://codesandbox.io/embed/Mjpv0E9qQ' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/side-effect'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
