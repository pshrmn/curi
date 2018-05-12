import React from "react";

const Img = ({ width, height, color }) => {
  return <div style={{ height, width, background: color, margin: 15 }} />;
};

const Album = ({ response: { params, data: images = [] } }) => {
  if (!images.length) {
    return <div>No images found :(</div>;
  }
  return (
    <div style={{ display: "flex", flexFlow: "row wrap", maxWidth: 800 }}>
      {images.map((d, i) => <Img key={i} {...d} />)}
    </div>
  );
};

export default Album;
