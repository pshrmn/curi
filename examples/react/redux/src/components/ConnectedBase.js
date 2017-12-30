import { CuriBase } from '@curi/react';
import { connect } from 'react-redux';

export default connect(
  ({ curi }) => ({
    response: curi.response,
    action: curi.action,
    router: curi.router
  })
)(CuriBase);
