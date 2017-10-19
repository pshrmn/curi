import React from 'react';
import BaseExample from './base/BaseExample';
import CodeSandboxDemo from '../components/CodeSandboxDemo';
import {
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Section } from '../components/Sections';

export default ({ name }) => (
  <BaseExample>
    <h1>{name}</h1>
    <Section
      title='Explanation'
      id='explanation'
    >
      <p>
        While Vue does have an official router, this project shows how you could use Curi as
        the router for a Vue project instead. It uses <Cmp>curi-link</Cmp>
        {' '}component provided by the the curi-vue package. Unlike the React examples, which
        use a <Cmp>Navigator</Cmp> component to automatically subscribe, here
        we are manually subscribing to navigation changes. We keep a reactive response object
        on our view model in order to automatically re-render when a new response is generated.
      </p>
    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo id='github/pshrmn/curi/tree/master/examples/basic-vue' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      <p>
        If you want to run this code locally, the source code is available on GitHub{' '}
        <a href='https://github.com/pshrmn/curi/tree/master/examples/basic-vue'>here</a>.
      </p>
      <Note>
        If you are experienced with Vue, you will probably notice that the layout of this
        application is not optimal. That is a just testament to my lack of familiarity with Vue.
        Hopefully will be fixed as I learn the best practices. Please feel free to point out any
        issues and I will update this example.
      </Note>
    </Section>
  </BaseExample>
);
