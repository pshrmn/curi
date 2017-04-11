// index.jsx transformed to this using https://babeljs.io/repl/
'use strict';

var { createConfig, path } = Curi;
var { Navigator, Link } = CuriReact;
var { createHashHistory } = History;

// views

var Home = function Home() {
  return React.createElement(
    'div',
    null,
    'Welcome home!'
  );
};
var About = function About() {
  return React.createElement(
    'div',
    null,
    'It\'s about time!'
  );
};
var Users = function Users() {
  return React.createElement(
    'div',
    null,
    'Ewe, sir?'
  );
};
var User = function User(props) {
  return React.createElement(
    'div',
    null,
    'Hello, Ms. ',
    props.id,
    '!'
  );
};

// setup
var hashHistory = createHashHistory();
var config = createConfig(hashHistory, [
  { name: 'Home', path: path('', { end: true }), value: Home },
  { name: 'About', path: path('about'), value: About },
  {
    name: 'Users',
    path: path('user'),
    value: Users,
    children: [{ name: 'User', path: path(':id'), value: User }]
  }
]);

var Nav = function Nav() {
  return React.createElement(
    'nav',
    null,
    React.createElement(
      'ul',
      null,
      React.createElement(
        'li',
        null,
        React.createElement(
          Link,
          { name: 'Home' },
          'Home'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          Link,
          { name: 'About' },
          'About'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          Link,
          { name: 'Users' },
          'Users'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          Link,
          { name: 'User', params: { id: 1 }},
          'User 1'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          Link,
          { name: 'User', params: { id: 12 }},
          'User 12'
        )
      )
    )
  );
};

config.ready().then(function () {
  ReactDOM.render(React.createElement(
    Navigator,
    { config: config },
    function (response) {
      return React.createElement(
        'div',
        null,
        React.createElement(Nav, null),
        React.createElement(response.render, response.params)
      );
    }
  ), document.getElementById('root'));
});