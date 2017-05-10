import React from 'react';

const Detail = ({ params }) => (
  <div>
    <div style={{
      width: '80%',
      height: '25%',
      minHeight: 200,
      background: params.color || '#666'
    }}></div>
    <p>
      Previewing paint color {params.color}
    </p>
  </div>
);

export default Detail;
