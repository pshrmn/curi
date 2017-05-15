import React from 'react';
import Nav from './components/Nav';

function render(response, config) {
  if (!response) {
    return null;
  }
  const { location, query, body:Body } = response;
  return (
    <div>
      <Nav />
      <p>
        Add a search string to the URI in the address bar and its values will be displayed below.
        (Don't forget to hit enter)
      </p>
      { Body ? <Body search={location.search} query={query} /> : null }
    </div>
  );
}

export default render;
