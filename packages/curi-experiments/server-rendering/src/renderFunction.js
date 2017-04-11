import React from 'react';
import Nav from './components/Nav';

const FourOhFour = () => (
  <div>Uh Oh!</div>
);

export default function(response) {
  let element;
  if (response.status === 404) {
    element = <FourOhFour />
  } else if (response.status !== 200 || !response.uri) {
    element = null;
  } else {
    element = <response.render params={response.params} />
  }
  return (
    <div>
      <Nav />
      { element }
    </div>
  );
}
