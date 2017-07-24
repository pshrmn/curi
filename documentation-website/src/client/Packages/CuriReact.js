import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';
import { Link } from 'curi-react';

const reexports = [
  'curi-react-navigator',
  'curi-react-link',
  'curi-react-redirect',
  'curi-react-block',
  'curi-react-active',
  'curi-react-curious'
];

export default ({ name, version, globalName }) => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>
      <PrismBlock lang='javascript'>
        {
`import {
  Navigator,
  Link,
  Redirect,
  Block,
  Active,
  curious
} from 'curi-react';`
        }
      </PrismBlock>

      <p>
        The curi-react package re-exports a number of React specific Curi packages. You can read
        the documentation for each one on their respective pages.
      </p>

      <ul>
        {
          reexports.map(p => (
            <li key={p}>
              <Link to='Package' params={{ package: p }}>{p}</Link>
            </li>
          ))
        }
      </ul>
    </APIBlock>
  </BasePackage>
);
