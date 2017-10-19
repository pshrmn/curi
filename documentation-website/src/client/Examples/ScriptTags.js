import React from 'react';
import BaseExample from './base/BaseExample';
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Section } from '../components/Sections';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        This example uses unbundled JavaScript and script tags to serve its content.If you want to
        use <Cmp>script</Cmp> tags in your application, Curi does provide builds
        for that. You can easily use <a href="https://unpkg.com">unpkg</a> to load the scripts, or
        download and serve them yourself.
      </p>

      <p>
        The global variable names for each package is upper camel case, so the <IJS>curi</IJS>{' '}
        package is globally available as <IJS>Curi</IJS> and the <IJS>curi-react</IJS>{' '}
        package is globally available as <IJS>CuriReact</IJS>.
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
