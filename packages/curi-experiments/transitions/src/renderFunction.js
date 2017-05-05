import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Nav from './components/Nav';

const FourOhFour = () => <div>404</div>

function render(response) {
  const { location, params, body } = response;
  const BodyComponent = body ? body : FourOhFour
  return (
    <div>
      <Nav />
      <CSSTransitionGroup
        transitionName='fade'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <BodyComponent key={location.pathname} params={params} />
      </CSSTransitionGroup>
    </div>
  );
}

export default render;
