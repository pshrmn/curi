import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@curi/react';
import Nav from './Nav';

const App = ({ response }) => {
  if (!response) {
    return null;
  }
  const { location, params, body:Body, redirectTo } = response;
  if (redirectTo) {
    return <Redirect to={redirectTo} />
  }

  return (
    <div>
      <Nav />
      {
        Body ? <Body params={params} /> : null
      }
    </div>
  );
}

export default connect(
  state => ({
    response: state.response
  })
)(App);
