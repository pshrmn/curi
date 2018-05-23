import React from "react";

import { delay } from "../api";
import cache from "../cache";

class Controls extends React.Component {
  state = {
    delay: delay()
  };

  delayHandler = event => {
    const value = delay(parseInt(event.target.value, 10));
    this.setState({
      delay: value
    });
  };

  clearCache = () => {
    cache.reset();
  };

  render() {
    return (
      <div style={{ border: "1px solid #444", padding: "5px" }}>
        <p>
          Use the controls to adjust the data load time and to clear the cache
          of loaded data.
        </p>
        <div>
          <label htmlFor="delay">Delay: {this.state.delay}</label>
          <input
            type="range"
            value={this.state.delay}
            min="0"
            max="5000"
            step="500"
            onChange={this.delayHandler}
          />
        </div>
        <div>
          <button type="button" onClick={this.clearCache}>
            Clear Cache
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
