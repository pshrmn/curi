import React from "react";
import { PrismBlock } from "../PrismBlocks";

const ReactBanner = () => (
  <PrismBlock lang="jsx">
    {`import React from 'react';
import ReactDOM from 'react-dom';

import Browser from '@hickory/browser';
import curi from '@curi/router';
import { CuriProvider } from '@curi/react';

const history = Browser();
const routes = [...];
const router = curi(history, routes);

ReactDOM.render((
  <CuriProvider router={router}>
    {({ response }) => {
      return <response.body />;
    }}
  </CuriProvider>
), document.getElementById('root'));`}
  </PrismBlock>
);

export default ReactBanner;
