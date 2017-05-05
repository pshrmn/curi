import React from 'react';
import { Link } from 'curi-react';

import dataStore from '../dataStore';

const Img = ({ width, height, color }) => {
  return (
    <div style={{ height, width, background: color, margin: 15 }}></div>
  );
}

const Album = ({ params }) => {
  const images = dataStore.get(params.id);
  if (!images.length) {
    return (
      <div>No images found :(</div>
    );
  }
  return (
    <div style={{ display: 'flex', flexFlow: 'row wrap', maxWidth: 800 }}>
      {
        images.map((d, i) => (
          <Img key={i} {...d} />
        ))
      }
    </div>
  );
}

export default Album;
