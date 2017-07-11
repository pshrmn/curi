import React from 'react';
import Nav from './components/Nav';

export default function render(response, config) {
  if (!response || !response.body) {
    return null;
  } else {
    const { body: Body, params, data } = response;
    return (
      <div>
        <header>
          <Nav />
        </header>
        <main>
          <Body params={params} data={data} />
        </main>
      </div>
    );
  }
};
