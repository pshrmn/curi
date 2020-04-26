import React from "react";

export default function ScrollableTable(props) {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  );
}
