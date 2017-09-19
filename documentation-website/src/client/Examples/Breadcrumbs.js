import React from 'react';
import BaseExample from '../components/BaseExample';
import { Section } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

export default ({ name }) => (
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
      <CodeSandboxDemo id='github/pshrmn/curi/tree/master/examples/breadcrumbs' />
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

