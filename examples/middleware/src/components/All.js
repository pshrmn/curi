import React from 'react';

const All = (props) => (
  <div>
    <h3>Converted "{props.search}" to {JSON.stringify(props.query, null, 2)}</h3>
  </div>
);

export default All;
