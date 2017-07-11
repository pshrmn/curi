import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';
import { Link } from 'curi-react';

const name = 'curi-react-active';
const version = require('./versions').default[name];
const type = 'react';

const CuriReactActive = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>
      <PrismBlock lang='javascript'>
        {
`import Active from 'curi-react-active';`
        }
      </PrismBlock>

      <p>
        The <InlineJS>&lt;Active&gt;</InlineJS> component lets you modify its children element's props.
        It takes a merge function as a prop, which you can use to modify the child element's props when
        the component is "active".
      </p>

      <div>
        <h3>props</h3>

        <div>
          <h4>name</h4>
          <p>
            The name of the route to compare against the response object.
          </p>
        </div>

        <div>
          <h4>params</h4>
          <p>
            An object containing route parameters. These will be compared against the route params of the
            response object.
          </p>
        </div>

        <div>
          <h4>children</h4>
          <p>
            A React element that will have its props updated when the <InlineJS>&lt;Active&gt;</InlineJS>
            {' '}component is "active".
          </p>
        </div>

        <div>
          <h4>merge</h4>
          <p>
            A function that will modify the children element's props. It receives a props object as its
            argument and must return a props object.
          </p>
        </div>

        <div>
          <h4>partial</h4>
          <p>
            A boolean that defaults to false. When it is true, the "active" check will check the response's partials
            array in addition to its name. This allows you to style ancestor routes of the actually "active" route.
          </p>
        </div>
      </div>
    </APIBlock>

    <div>
      <h2>Usage</h2>

      <PrismBlock lang='jsx'>
        {
`function merge(props) {
  props.className = 'active';
  return props; 
}

const Users = (props) => (
  {
    props.users.map(u => (
      <Active
        key={u.id}
        name='User'
        params={u}
      >
        <User {...u} />
      </Active>
    ))
  }
);`
        }
      </PrismBlock>

      <p>
        This relies on the active addon from{' '}
        <Link to='Package' params={{ package: 'curi-addon-active' }}>curi-addon-active</Link> being
        added to your configuration object.
      </p>

      <PrismBlock lang='javascript'>
        {
`import createActiveAddon from 'curi-active-addon';

const config = createConfig(history, routes, {
  addons: [createActiveAddon]
});`
        }
      </PrismBlock>

      <p>
        While not strictly a requirement, the <InlineJS>&lt;Active&gt;</InlineJS> relies on the{' '}
        <InlineJS>curi</InlineJS> and <InlineJS>curiResponse</InlineJS> context variables existing,
        so your application should have a <InlineJS>&lt;Navigator&gt;</InlineJS> (from{' '}
        <Link to='Package' params={{ package: 'curi-react-navigator'}}>curi-react-navigator</Link>)
        as an ancestor of your <InlineJS>&lt;Active&gt;</InlineJS> components in order to ensure that those
        exist.
      </p>
    </div>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriReactActive
};
