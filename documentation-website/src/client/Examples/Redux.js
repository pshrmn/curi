import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'redux';
const name = 'Redux';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Redux is straightforward to integrate with a Curi project.
      </p>

      <p>
        You will most likely want to export your store from its own module so that it can be imported
        throughout your project. Then, any routes that need data to be loaded prior to rendering would
        dispatch to the store from their load function.
      </p>

      <PrismBlock lang='javascript'>
        {
`import store from './store';
import setData from './actions';
const routes = [
  // ...,
  {
    name: 'Data',
    path: 'data/:id'
    value: Data,
    load: (resp) => {
      const { id } = resp.params;
      // get the data associated with the id
      return fetch(\`/api/data/\$\{id\}\`)
        .then(data => {
          store.dispatch(setData(data));
        });
    }
  }
  // ...
];`
        }
      </PrismBlock>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo id='58xm6O7yX' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/redux'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
