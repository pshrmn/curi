import React from "react";
import { Link } from "@curi/react";
import { css } from "emotion";

import ReactBanner from "./ReactBanner";
import VueBanner from "./VueBanner";
import GenericBanner from "./GenericBanner";
import SvelteBanner from "./SvelteBanner";

import STYLES from "../../constants/styles";

const banner = css(`
  margin: 15px 0 50px;
  color: ${STYLES.purple};
  max-width: 800px;
  padding: 0 15px;

  h1 {
    margin: 10px 0;
  }

  p {
    font-size: 1.1em;
    margin: 0;
  }

  .banner-buttons {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;

    button {
      font-family: ${STYLES.serif};
      flex-grow: 1;
      font-size: 1.1em;
      background: ${STYLES.white};
      color: ${STYLES.purple};
      border: 0;
      border-bottom: 3px solid ${STYLES.white};
      cursor: pointer;

      &.active {
        font-weight: normal;
        border-color: ${STYLES.purple};
      }
    }
  }

@media only screen and (min-width: ${STYLES.mediumScreen}) {
  padding: 0;
}
`);

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
      <div className={banner}>
        <h1>Curi is a JavaScript router for single-page applications</h1>
        <p>
          Curi cares about routing, not how you render. Building an application
          with React? Cool! Or maybe you use Vue? Great! Svelte? Nice! A brand
          new framework? Why not!
        </p>
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
