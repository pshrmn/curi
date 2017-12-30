import React from 'react';
import Header from './components/Header';

export default function render(response, action, router) {
  if (!response || !response.body) {
    return null;
  } else {
    const { body: Body, params, data } = response;
    return (
      <div>
        <Header />
        <main>
          <Body params={params} data={data} />
        </main>
      </div>
    );
  }
}
