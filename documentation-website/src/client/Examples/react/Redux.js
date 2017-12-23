import React from 'react';
import BaseExample from '../base/BaseExample';
import { Section } from '../../components/Sections';
import CodeSandboxDemo from '../../components/CodeSandboxDemo';
import { InlineJS as IJS, PrismBlock } from '../../components/PrismBlocks';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section title="Explanation" id="explanation">
      <p>Redux is straightforward to integrate with a Curi project.</p>

      <p>
        You will most likely want to export your store from its own module so
        that it can be imported throughout your project. Then, any routes that
        need data to be loaded prior to rendering would dispatch to the store
        from their <IJS>match.response</IJS> function.
      </p>

      <PrismBlock lang="javascript">
        {`import store from './store';
import setData from './actions';
const routes = [
  // ...,
  {
    name: 'Data',
    path: 'data/:id'
    value: Data,
    match: {
      every: ({ params }) => {
        // get the data associated with the id
        return fetch(\`/api/data/\$\{id\}\`)
      },
      response: ({ resolved }) => {
        store.dispatch(
          setData(resolved)
        );
      }
    }
  }
  // ...
];`}
      </PrismBlock>
    </Section>

    <Section title="Live Demo" id="demo">
      <CodeSandboxDemo id="github/pshrmn/curi/tree/master/examples/redux" />
    </Section>

    <Section title="On GitHub" id="source">
      If you want to run this code locally, the source code is available on
      GitHub{' '}
      <a href="https://github.com/pshrmn/curi/tree/master/examples/redux">
        here
      </a>.
    </Section>
  </BaseExample>
);
