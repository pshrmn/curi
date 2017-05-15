const Home = () => React.createElement('div', null, 'Welcome Home!');
const About = () => React.createElement('div', null, 'What about it?');
const Nav = () => (
  React.createElement('nav', null,
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement(CuriReactLink, { to: 'Home' }, 'Home')
      ),
      React.createElement('li', null,
        React.createElement(CuriReactLink, { to: 'About' }, 'About')
      )
    )
  )
);


const hashHistory = History.createHashHistory();
const routes = [
  {
    name: 'Home',
    path: '',
    value: Home
  },
  {
    name: 'About',
    path: 'about',
    value: About
  }
];

const config = Curi(hashHistory, routes);

ReactDOM.render((
  React.createElement(CuriReactNavigator, {
    config: config,
    children: function(response) {
      if (!response) {
        return null;
      }
      const Body = response.body ? response.body : null
      return React.createElement('div', null,
        React.createElement(Nav),
        React.createElement(Body)
      )
    }
  })
), document.getElementById('root'));
