import React from "react";
import { PrismBlock } from "../PrismBlocks";

const ReactBanner = () => (
  <PrismBlock lang="jsx">
    {`import React from 'react';
import ReactDOM from 'react-dom';

import Browser from '@hickory/browser';
import curi from '@curi/core';
import { ResponsiveBase } from '@curi/react';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi router
const router = curi(history, routes);

const root = document.getElementById('root');
// subscribe to the router object with a function
// that will be called whenever the location changes
router.respond(() => {
  ReactDOM.render((
    <ResponsiveBase
      router={router}
      render={({ response }) => {
        return <response.body />;
      }}
    />
  ), root);
});`}
  </PrismBlock>
);

export default ReactBanner;
