import React from 'react';
import BaseExample from '../components/BaseExample';
import { Link } from 'curi-react';
import { Section } from '../components/Sections';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Code splitting with curi routes is done using the preload property. The{' '}
        <Link to='Guide' params={{ slug: 'code-splitting'}}>code splitting</Link> guide
        covers the basic principles for how to do this. This example just provides you
        with code that actually implements what is explained there.
      </p>
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/code-splitting'>here</a>.
    </Section>
  </BaseExample>
);
