import React from 'react';
import { connect } from 'react-redux';
import Link from 'curi-react/lib/Link';

const ProductThumbnail = (props) => (
  <div className='thumbnail'>
    <Link name='Product' params={{ id: props.id }}>
      { props.name }
    </Link>
  </div>
);

const Home = (props) => (
  <div>
    { props.products.map((p, i) => <ProductThumbnail key={i} {...p} />) }
  </div>
);

export default connect(
  store => ({
    products: Object.keys(store).map(key => store[key])
  })
)(Home);
