import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'script-tags';
const name = 'Script Tags';

const ActiveLinks = () => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        This example uses unbundled JavaScript and script tags to serve its content.If you want to
        use <InlineJS>&lt;script&gt;</InlineJS> tags in your application, Curi does provide builds
        for that. You can easily use <a href="https://unpkg.com">unpkg</a> to load the scripts, or
        download and serve them yourself.
      </p>

      <p>
        The global variable names for each package is upper camel case, so the <InlineJS>curi</InlineJS>{' '}
        package is globally available as <InlineJS>Curi</InlineJS> and the <InlineJS>curi-react</InlineJS>{' '}
        package is globally available as <InlineJS>CuriReact</InlineJS>.
      </p>
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/umd-example'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
