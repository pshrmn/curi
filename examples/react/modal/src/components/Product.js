import React from 'react';
import { Link } from '@curi/react';

const Preview = ({ color }) => (
  <div style={{
    width: 20,
    height: 20,
    background: color || '#666'
  }}></div>
)

const Product = ({ params, location }) => (
  <div>
    Paint color: {location.state.name || 'Unknown'}
    <Preview color={params.color} />
    <Link
      to='Product Detail'
      params={params}
      details={{ state: { modal: true, name: 'Dark Slate Blue' } }}
    >
      Detail View
    </Link>
  </div>
);

export default Product;
