import React from 'react';
import BasePackage from '../components/BasePackage';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <p>
        The <Cmp>Navigator</Cmp> component provides a way to automatically re-render
        your application when the location changes. This component gets passed a curi
        configuration object, which it will subscribe to so that it can re-render when
        the location changes.
      </p>
    )}
  >
    <APIBlock>
    <h3>&lt;Navigator&gt;</h3>
      <PrismBlock lang='javascript'>
        {
`import Navigator from '@curi/react-navigator';`
        }
      </PrismBlock>

      <p>
        
      </p>

      <PrismBlock lang='jsx'>
        {
`const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config}>
    {(response, config) => {
      if (!response) {
        return null;
      }
      return response.body ? <response.body /> : null;
    }}
  </Navigator>
), holder);`
        }
      </PrismBlock>

      <div className='section'>
        <h3>props</h3>

        <div className='subsection'>
          <h4>config</h4>
          <p>
            A configuration object (created by calling curi's createConfig function).
          </p>
        </div>

        <div className='subsection'>
          <h4>children</h4>
          <p>
            A render function. This will be called whenever the <Cmp>Navigator</Cmp>
            {' '}renders. The function will be passed the current response object and the config object it
            was passed as a prop. The function must return a React element.
          </p>
        </div>

        <div className='subsection'>
          <h4>response</h4>
          <p>
            A response object. You can pass your <Cmp>Navigator</Cmp> a response object and
            it will use that instead of subscribing to the configuration object. This is ideal for server-side
            rendering.
          </p>
        </div>
      </div>
    </APIBlock>
  </BasePackage>
);
