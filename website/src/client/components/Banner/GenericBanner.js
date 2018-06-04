import React from "react";
import { PrismBlock } from "../PrismBlocks";

const GenericBanner = () => (
  <PrismBlock lang="javascript">
    {`import Browser from '@hickory/browser';
import curi from '@curi/router';

// create your history object
const history = Browser();

// define your routes
const routes = [
  { name: 'Home', path: '', ... },
  { name: 'User', path: 'u/:userID', ... },
  ...
];

// create your Curi router
const router = curi(history, routes);`}
  </PrismBlock>
);

export default GenericBanner;
