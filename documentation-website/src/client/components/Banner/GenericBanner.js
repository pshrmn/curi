import React from "react";
import { PrismBlock } from "../PrismBlocks";

const GenericBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/core';

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

// setup a response handler to be called when
// responses are emitted
router.respond(() => {
  // handle any rendering inside of this function
});`}
  </PrismBlock>
);

export default GenericBanner;
