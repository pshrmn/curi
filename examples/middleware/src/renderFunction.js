import React from 'react';
import Nav from './components/Nav';

function render(response, config) {
  if (!response) {
    return null;
  }
  const { params, body:Body } = response;
  return (
    <div>
      <Nav />
      { Body ? <Body params={params} /> : null }
    </div>
  );
}

export default render;
