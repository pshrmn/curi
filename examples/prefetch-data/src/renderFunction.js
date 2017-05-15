import React from 'react';
import NProgress from 'nprogress';
import Nav from './components/Nav';

function render(response) {
  if (!response) {
    return null;
  }
  const { body:Body, params, data } = response;
  // whenever we re-render, finish the progress bar
  NProgress.done();
  return (
    <div>
      <Nav />
      <Body params={params} data={data} />
    </div>
  );
}

export default render;
