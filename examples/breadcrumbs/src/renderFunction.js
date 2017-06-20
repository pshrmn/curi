import React from 'react';

function render(response) {
  if (!response) {
    return null;
  }
  const { body:Body, params, data } = response;

  return <Body params={params} data={data} />
}

export default render;
