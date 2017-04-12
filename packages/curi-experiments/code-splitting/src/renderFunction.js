import React from 'react';
import Nav from './components/Nav';

export default function(response) {
  let element;
  if (response.status !== 200 || !response.uri) {
    element = null;
  } else {
    element = <response.body />
  }
  return (
    <div>
      <Nav />
      { element }
    </div>
  )
}
