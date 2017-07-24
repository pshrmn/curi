import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'transitions';
const name = 'Transitions';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        This example uses <InlineJS>react-transition-group</InlineJS> (v1) to animate navigation transitions,
        but it should be relatively straightforward to adapt this for other animation packages (e.g. react-motion).
      </p>

      <p>
        All that this does is to render a <InlineJS>&lt;CSSTransitionGroup&gt;</InlineJS> around the response's body.
        The only other thing that you need to do is to set a key on the rendered component, which is necessary
        for <InlineJS>&lt;CSSTransitionGroup&gt;</InlineJS> to know which of its children are entering/leaving/staying.
      </p>

      <PrismBlock lang='jsx'>
        {
`function render(response) {
  return (
    <CSSTransitionGroup>
      <response.body key={response.location.pathname} />
    </CSSTransitionGroup>
  );
}`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo id='jkJkBKWl' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/transitions'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
