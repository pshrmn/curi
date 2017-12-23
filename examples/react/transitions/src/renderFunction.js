import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './components/Nav';

const FourOhFour = () => <div>404</div>

function render(response) {
  const { location, params, body } = response;
  const BodyComponent = body ? body : FourOhFour
  return (
    <div>
      <Nav />
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames='fade'
          timeout={500}
        >
          <BodyComponent key={location.pathname} params={params} />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default render;
