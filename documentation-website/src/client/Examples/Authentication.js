import React from 'react';
import BaseExample from '../components/BaseExample';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
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
        Sometimes you will want to redirect based on the results of your load function. For instance, you might see
        that a user is not authenticated and shouldn't be able to view a page.
      </p>

      <p>
        When this happens, your load function should modify the response by calling its redirect method.
      </p>

      <PrismBlock lang='javascript'>
        {
`const routes = [
  // ...,
  {
    name: 'Protected',
    path: 'super-secret',
    load: (resp) => {
      if (!store.userIsAuthenticated) {
        resp.redirect('/login', 302);
      }
    }
  }
];`
        }
      </PrismBlock>

      <p>
        Then, in your render function (the <Cmp>Navigator</Cmp>'s children prop), you would check the
        if the response's <IJS>redirectTo</IJS> property is set. If it is, you could manually redirect using{' '}
        <IJS>config.history</IJS> or just render a <Cmp>Redirect</Cmp> and that will be handled
        for you.
      </p>

      <PrismBlock lang='javascript'>
        {

`function render(response, config) {
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }
  // ...
}`
        }
      </PrismBlock>

    </Section>

    <Section
      title='Live Demo'
      id='demo'
    >
      <CodeSandboxDemo id='github/pshrmn/curi/tree/master/examples/authentication' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/authentication'>here</a>.
    </Section>
  </BaseExample>
);
