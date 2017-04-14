import React from 'react';
import Redirect from 'curi-react/lib/Redirect';

import Nav from './components/Nav';
import NotFound from './components/NotFound';

function render(response, config) {
  const { location, params } = response;
  if (response.redirectTo) {
    return <Redirect to={response.redirectTo} />
  }

  return (
    <div>
      <Nav />
      {
        response.body
          ? <response.body params={params} history={config.history} location={location} />
          : <NotFound />
      }
    </div>
  );
}

export default render;
