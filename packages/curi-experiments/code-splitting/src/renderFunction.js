import React from 'react';
import Nav from './components/Nav';

export default function(response) {
  return (
    <div>
      <Nav />
      { response.body ? <response.body /> : null }
    </div>
  )
}
