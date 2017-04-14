import React from 'react';
import Nav from './components/Nav';

const FourOhFour = () => (
  <div>Uh Oh!</div>
);

export default function(response) {
  const { body:Body, params } = response;
  return (
    <div>
      <Nav />
      { Body ? <Body params={params} /> : <FourOhFour /> }
    </div>
  );
}
