const Home = () => React.createElement('div', null, 'Welcome Home!');
const About = () => React.createElement('div', null, 'What about it?');
const Nav = () => (
  React.createElement('nav', null,
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement(CuriReactLink, { name: 'Home' }, 'Home')
      ),
      React.createElement('li', null,
        React.createElement(CuriReactLink, { name: 'About' }, 'About')
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

config.ready().then(() => {
  ReactDOM.render((
    React.createElement(CuriReactNavigator, {
      config: config,
      children: function(response) {
        const Body = response.body ? response.body : null
        return React.createElement('div', null,
          React.createElement(Nav),
          React.createElement(Body)
        )
      }
    })
  ), document.getElementById('root'));
});
