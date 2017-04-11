const { createConfig, path } = Curi;
const { Navigator, Link } = CuriReact;
const { createHashHistory } = History;

// views
const Home = () => <div>Welcome home!</div>
const About = () => <div>It's about time!</div>
const Users = () => <div>Ewe, sir?</div>
const User = props => <div>Hello, Ms. {props.id}!</div>

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
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li><Link name='About'>About</Link></li>
      <li><Link name='Users'>Users</Link></li>
      <li><Link name='User' params={{ id: 1 }}>User 1</Link></li>
      <li><Link name='User'params={{ id: 12 }}>User 12</Link></li>
    </ul>
  </nav>
);

config.ready()
  .then(() => {
    ReactDOM.render((
      <Navigator config={config}>
        {(response) => {
          return (
            <div>
              <Nav />
              <response.render {...response.params} />
            </div>
          );
        }}
      </Navigator>
    ), document.getElementById('root'));
  });
