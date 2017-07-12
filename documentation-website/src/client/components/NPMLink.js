import React from 'react';

export default ({ name }) => (
  <a href={`https://npmjs.com/package/${name}`}>
    <img style={{ height: 16, marginRight: 5 }} src='/curi/static/img/npm-logo.png' />NPM Package
  </a>
);
