import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'active-links';
const name = 'Active Links';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        You may want to style a link differently when it is "active" (based on the current
        response object). You can do so using the active prop of <InlineJS>&lt;Link&gt;</InlineJS>.
      </p>

      <p>
        The active prop must be an object with a <InlineJS>merge</InlineJS> function as one of
        its properties. The merge function is responsible for updating the props that will be
        passed to the anchor (<InlineJS>&lt;a&gt;</InlineJS>).
      </p>

      <p>
        You can also pass a <InlineJS>partial</InlineJS> property to the active object. partial
        should be a boolean, and when it is true (the Link's <InlineJS>to</InlineJS> property is
        in the response's partials array) it can be "active" if its params match the response's params.
      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo src='https://codesandbox.io/embed/J9x3n3k2' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/active-links'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
