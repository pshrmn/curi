const { createConfig, path } = URIC;
const { Navigator, Link } = URICReact;
const { createHashHistory } = History;

// views
const Home = () => React.createElement('div', null, 'Welcome home!');
const About = () => React.createElement('div', null, 'It\'s about time!');
const Users = () => React.createElement('div', null, 'Ewe, sir?');
const User = props => React.createElement('div', null, `Hello, Ms. ${props.id}!`)

// setup
const hashHistory = createHashHistory();
const config = createConfig(hashHistory, [
  { name: 'Home', path: path('', { end: true }), value: Home },
  { name: 'About', path: path('about'), value: About },
  { 
    name: 'Users',
    path: path('user'),
    value: Users,
    children: [
      { name: 'User', path: path(':id'), value: User }
    ]
  }
]);

const Nav = () => (
  React.createElement(
    'nav',
    null,
    React.createElement(
      'ul',
      null,
      React.createElement('li', null,
        React.createElement(Link, { name: 'Home' }, 'Home')
      ),
      React.createElement('li', null,
        React.createElement(Link, { name: 'About' }, 'About')
      ),
      React.createElement('li', null,
        React.createElement(Link, { name: 'Users' }, 'Users')
      ),
      React.createElement('li', null,
        React.createElement(Link, { name: 'User', params: { id: 1 } }, 'User 1')),
      React.createElement('li', null,
        React.createElement(Link, { name: 'User', params: { id: 12 } }, 'User 12')
      )
    )
  )
);

config.ready()
  .then(() => {
    ReactDOM.render((
      React.createElement(Navigator, {
        config,
        children: (response) => {
          return React.createElement('div', null,
            React.createElement(Nav),
            React.createElement(response.render, response.params)
          )
        }
      })
    ), document.getElementById('root'));
  });
