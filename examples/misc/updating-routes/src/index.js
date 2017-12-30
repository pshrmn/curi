import React from 'react';
import ReactDOM from 'react-dom';
import Browser from '@hickory/browser';
import curi from '@curi/core';

import App from './components/App';
import { baseRoutes } from './routes';

const history = Browser();
const router = curi(history, baseRoutes);
const root = document.getElementById('root');

router.respond((response, action) => {
  ReactDOM.render((
    <App
      response={response}
      action={action}
      router={router}
    />
  ), root);
});
