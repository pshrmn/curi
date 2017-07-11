import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import { Link } from 'curi-react';
import APIBlock from '../components/APIBlock';

const name = 'curi-side-effect-scroll';
const version = '0.1.0';
const type = 'side-effect';

const CuriSideEffectScroll = () => (
  <BasePackage name={name} version={version}>
    <APIBlock>

      <h3>createScrollSideEffect</h3>
      <PrismBlock lang='javascript'>      
        {
`import createConfig from 'curi';
import createScrollSideEffect from 'curi-side-effect-scroll';

const scrollTo = createScrollSideEffect();

const config = createConfig(history, routes, {
  sideEffects: [scrollTo]
});`
        }
      </PrismBlock>

      <p>
        Hickory, the history package that Curi uses, uses the <InlineJS>pushState</InlineJS>
        {' '}and <InlineJS>replaceState</InlineJS> methods for navigation. Unfortunately, these
        do not trigger scrolling to the top of the page when you navigate. This package provides
        a side effect function that will scroll to the top of the page whenever those functions
        are used for navigation.
      </p>
      <p>
        Other navigation, such as clicking the browsers back and forward buttons, rely on the
        browser to restore the scroll position.
      </p>
    </APIBlock>
  </BasePackage>
);

export default {
  name,
  version,
  type,
  component: CuriSideEffectScroll
};
