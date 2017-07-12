import React from 'react';

export default ({ name }) => (
  <a href={`https://github.com/pshrmn/curi/tree/master/packages/${name}`}>
    <img style={{ height: 16, marginRight: 5 }} src='/static/img/github-logo.png' />GitHub Repo
  </a>
);
