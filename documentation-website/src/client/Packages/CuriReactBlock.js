import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';

const name = 'curi-react-block';
const version = '0.3.0';
const type = 'react';

const CuriReactBlock = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>
      <PrismBlock lang='javascript'>
        {
`import Block from 'curi-react-block';`
        }
      </PrismBlock>

      <p>
        The <InlineJS>&lt;Block&gt;</InlineJS> component lets you prevent navigation until a user
        has confirmed that they want to navigate. This can be useful when the user attempts to navigate
        away from a partially filled form. This <strong>will not</strong> prevent the user from navigating
        to another site, it only works for navigation within the application.
      </p>

      <div>
        <h3>props</h3>

        <div>
          <h4>when</h4>
          <p>
            A boolean, which is true by default. When it is true, the navigation block is active. When
            it is false, navigation will not be blocked.
          </p>
          <PrismBlock lang='jsx'>
            {
`// will block navigation
<Block when={true} confirm={confirm} />

// will not block navigation
<Block when={false} confirm={confirm} />`
            }
          </PrismBlock>
        </div>

        <div>
          <h4>confirm</h4>
          <p>
            The confirm prop is a function that will be called whenever there is navigation. The
            function will receive four arguments: location, action, success, and failure. The location
            and action values are the location object that is being navigated to and the type of
            navigation. The success and failure arguments are functions that you should call depending
            on whether or not you want to let the navigation happen. When the navigation should occur,
            the confirm function should call the success function. When the navigation should be
            cancelled, the failure function should be called.
          </p>
          <PrismBlock lang='jsx'>
            {
`<Block
  confirm={(location, action, success, failure) => {
    const response = window.confirm("Shall we?");
    if (response) {
      success();
    } else {
      failure();
    }
  }}
/>`
            }
          </PrismBlock>
        </div>
      </div>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriReactBlock
};
