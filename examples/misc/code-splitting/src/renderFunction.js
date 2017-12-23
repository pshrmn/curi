import React from 'react';
import Nav from './components/Nav';

export default function(response) {
  if (!response) {
    return null;
  }
  return (
    <div>
      <Nav />
      { response.body ? <response.body /> : null }
    </div>
  )
}
