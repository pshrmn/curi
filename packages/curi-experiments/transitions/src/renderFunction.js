import { CSSTransitionGroup } from 'react-transition-group';
import Nav from './components/Nav';

function render(response) {
  const { location, params } = response;
  return (
    <div>
      <Nav />
      <CSSTransitionGroup
        transitionName='fade'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <response.render key={location.pathname} params={params} />
      </CSSTransitionGroup>
    </div>
  );
}

export default render;
