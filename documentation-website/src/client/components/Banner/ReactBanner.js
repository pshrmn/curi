import React from "react";
import { PrismBlock } from "../PrismBlocks";

const ReactBanner = () => (
  <PrismBlock lang="jsx">
    {`import React from 'react';
import ReactDOM from 'react-dom';

import Browser from '@hickory/browser';
import curi from '@curi/core';
import { ResponsiveBase } from '@curi/react';

const history = Browser();
const routes = [...];
const router = curi(history, routes);

const root = document.getElementById('root');
// add a one-time response handler to wait
// for the initial response
router.respond(() => {
  ReactDOM.render((
    <ResponsiveBase
      router={router}
      render={({ response }) => {
        return <response.body />;
      }}
    />
  ), root);
}, { once: true });`}
  </PrismBlock>
);

export default ReactBanner;
