import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'breadcrumbs';
const name = 'Breadcrumbs';

const Breadcrumbs = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        You can easily generate breadcrumb navigation links for the current route using the
        curi-addon-ancestors package. This allows you to get the route names for the current
        route. Using these names you can render a Link for each one (passing the parameters
          if necessary).
      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo src='https://codesandbox.io/embed/B0kKDO5o' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/breadcrumbs'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: Breadcrumbs
};
