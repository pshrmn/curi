import React from "react";

let ScrollableTable = props => {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  );
};

export default ScrollableTable;
