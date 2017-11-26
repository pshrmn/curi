const Home = () => React.createElement('div', null, 'Welcome Home!');
const About = () => React.createElement('div', null, 'What about it?');
const Nav = () => (
  React.createElement('nav', null,
    React.createElement('ul', null,
      React.createElement('li', null,
        React.createElement(CuriReact.Link, { to: 'Home' }, 'Home')
      ),
      React.createElement('li', null,
        React.createElement(CuriReact.Link, { to: 'About' }, 'About')
      )
    )
  )
);


const hashHistory = HickoryHash();
const routes = [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'About',
    path: 'about',
    body: () => About
  }
];

const config = Curi(hashHistory, routes);
const root = document.getElementById('root');

function render(response) {
  if (!response || response.status === 404) {
    return React.createElement('div', null,
      'The page you were looking for does not exist'
    );
  }
  const Body = response.body ? response.body : null
  return React.createElement('div', null,
    React.createElement(Nav),
    React.createElement(Body)
  );
}

config.subscribe((response, action) => {
  ReactDOM.render((
    React.createElement(CuriReact.Navigator, {
      response: response,
      action: action,
      config: config,
      render: render
    })
  ), root);
});
