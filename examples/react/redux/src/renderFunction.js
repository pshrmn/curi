import React from 'react';
import Nav from './components/Nav';

export default function(response) {
  const { params, body:Body } = response;
  return (
    <div>
      <Nav />
      <Body params={params} />
    </div>
  );
}
