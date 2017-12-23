import React from 'react';

import { Link } from '@curi/react';
import ReactBanner from './ReactBanner';
import VueBanner from './VueBanner';
import GenericBanner from './GenericBanner';
import SvelteBanner from './SvelteBanner';

class Banner extends React.Component {
  state = { lib: 'Any' };

  setActive = lib => {
    this.setState({ lib });
  };

  render() {
    const { lib } = this.state;
    let BannerComponent = GenericBanner;
    if (lib === 'React') {
      BannerComponent = ReactBanner;
    } else if (lib === 'Vue') {
      BannerComponent = VueBanner;
    } else if (lib === 'Svelte') {
      BannerComponent = SvelteBanner;
    }
    return (
      <div className="banner">
        <h1>Curi</h1>
        <p>A universal JavaScript single-page application router.</p>
        <div className="banner-buttons">
          <BannerButton
            name="Any"
            setActive={this.setActive}
            active={lib === 'Any'}
          />
          <BannerButton
            name="React"
            setActive={this.setActive}
            active={lib === 'React'}
          />
          <BannerButton
            name="Vue"
            setActive={this.setActive}
            active={lib === 'Vue'}
          />
          <BannerButton
            name="Svelte"
            setActive={this.setActive}
            active={lib === 'Svelte'}
          />
        </div>
        <BannerComponent />
        <p>
          Ready to learn more? Check out the{' '}
          <Link to="Guide" params={{ slug: 'getting-started' }}>
            getting started
          </Link>{' '}
          guide.
        </p>
      </div>
    );
  }
}

const BannerButton = ({ name, active, setActive }) => (
  <button
    className={active ? 'active' : ''}
    onClick={() => {
      setActive(name);
    }}
  >
    {name}
  </button>
);

export default Banner;
