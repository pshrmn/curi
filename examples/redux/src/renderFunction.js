import React from 'react';
import { Redirect } from '@curi/react';
import Nav from './components/Nav';

function render(response, config) {
  if (!response) {
    return null;
  }
  const { location, params, body:Body, redirectTo } = response;
  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return (
    <div>
      <Nav />
      {
        Body ? <Body params={params} /> : null
      }
    </div>
  );
}

export default render;
