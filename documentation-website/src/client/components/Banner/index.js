import React from "react";

import { Link } from "@curi/react";
import ReactBanner from "./ReactBanner";
import VueBanner from "./VueBanner";
import GenericBanner from "./GenericBanner";
import SvelteBanner from "./SvelteBanner";

class Banner extends React.Component {
  state = { lib: "Any" };

  setActive = lib => {
    this.setState({ lib });
  };

  render() {
    const { lib } = this.state;
    let BannerComponent = GenericBanner;
    if (lib === "React") {
      BannerComponent = ReactBanner;
    } else if (lib === "Vue") {
      BannerComponent = VueBanner;
    } else if (lib === "Svelte") {
      BannerComponent = SvelteBanner;
    }
    const banners = ["Any", "React", "Vue", "Svelte"];
    return (
      <div className="banner">
        <h2>A JavaScript router that doesn't care how you render.</h2>
        <div className="banner-buttons">
          {banners.map(b => (
            <BannerButton
              key={b}
              name={b}
              setActive={this.setActive}
              active={lib === b}
            />
          ))}
        </div>
        <BannerComponent />
        <p>
          Ready to learn more? Check out the{" "}
          <Link to="Guide" params={{ slug: "getting-started" }}>
            getting started
          </Link>{" "}
          guide.
        </p>
      </div>
    );
  }
}

const BannerButton = ({ name, active, setActive }) => (
  <button
    className={active ? "active" : ""}
    onClick={() => {
      setActive(name);
    }}
  >
    {name}
  </button>
);

export default Banner;
