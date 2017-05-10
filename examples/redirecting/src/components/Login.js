import React from 'react';
import qs from 'qs';

import fakeAuth from '../fakeAuth';

const Login = (props) => (
  <div>
    <button
      type='button'
      onClick={(e) => {
        fakeAuth.login();
        const query = qs.parse(props.location.search.slice(1));
        props.history.replace(query.next || '/');
      }}
    >
      Login
    </button>
  </div>
);

export default Login;
