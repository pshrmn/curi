import React from 'react';
import BaseExample from '../components/BaseExample';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Note } from '../components/Messages';
import { Link } from 'curi-react';
import { Section, Subsection } from '../components/Sections';
import CodeSandboxDemo from '../components/CodeSandboxDemo';

const slug = 'redirecting';
const name = 'Redirecting';

const ActiveLinks = () => (
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
        Then, in your render function (the <InlineJS>&lt;Navigator&gt;</InlineJS>'s children prop), you would check the
        if the response's <InlineJS>redirectTo</InlineJS> property is set. If it is, you could manually redirect using{' '}
        <InlineJS>config.history</InlineJS> or just render a <InlineJS>&lt;Redirect&gt;</InlineJS> and that will be handled
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
      <CodeSandboxDemo src='https://codesandbox.io/embed/v20oL7yJm' />
    </Section>

    <Section
      title='On GitHub'
      id='source'
    >
      If you want to run this code locally, the source code is available on GitHub{' '}
      <a href='https://github.com/pshrmn/curi/tree/master/examples/redirecting'>here</a>.
    </Section>
  </BaseExample>
);

export default {
  name,
  slug,
  component: ActiveLinks
};
