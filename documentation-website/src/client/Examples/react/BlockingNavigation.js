import React from 'react';
import BaseExample from '../base/BaseExample';
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../../components/PrismBlocks';
import { Section } from '../../components/Sections';
import CodeSandboxDemo from '../../components/CodeSandboxDemo';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        Sometimes, you don't want the user to leave the page. Ideally, this is for their own
        good, such as when a form is half filled out, and not becacuse you're running a spam
        site.
      </p>
      <p>
        When you want to do this, you can use the <Cmp>Block</Cmp> component
        from react-curi to display a user confirmation that requires user input before navigation
        will occur.
      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo id='github/pshrmn/curi/tree/master/examples/blocking-navigation' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/blocking-navigation'>here</a>.
    </Section>
  </BaseExample>
);
