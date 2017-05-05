import React from 'react';
import { Link } from 'curi-react';

const Detail = ({ params }) => (
  <div>
    <div style={{
      width: 200,
      height: 200,
      background: params.color || '#666'
    }}></div>
    <p>
      Previewing paint color {params.color}
    </p>
  </div>
);

export default Detail;
