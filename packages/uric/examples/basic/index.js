const { createConfig, path } = URIC;
const { createHashHistory } = History;

// cache the root node
const root = document.getElementById('root');

// views
const Home = () => div('Welcome home!')
const About = () => div('It\'s about time!');
const Users = () => div('Ewe, sir?!');
const User = (data) => div('Hello, Ms. ' + data.id + '!');


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

// some node creating functions
function mount(ele, parent) {
  parent.innerHTML = '';
  parent.appendChild(ele);
}

function add(tag, parent) {
  const ele = document.createElement(tag);
  parent.appendChild(ele);
  return ele;
}

function div(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div;
}

const createLink = (name, text, params, parent) => {
  const pathname = config.addons.pathname(name, params);
  const href = hashHistory.createHref({ pathname });
  
  const a = document.createElement('a');
  a.textContent = text;
  a.href = href;
  // rely on history for navigation
  a.addEventListener('click', function(e) {
    e.preventDefault();
    hashHistory.push({ pathname });
  }, false);

  parent.appendChild(a);
  return a;
}

// add the nav html
const nav = add('nav', root);
const ul = add('ul', nav);
const main = add('main', root);

const links = [
  { name: 'Home', text: 'Home'},
  { name: 'About', text: 'About'},
  { name: 'Users', text: 'Users' },
  { name: 'User', text: 'User 7', params: { id: 7 }},
  { name: 'User', text: 'User 17', params: { id: 17 }},
  { name: 'User', text: 'User 27', params: { id: 27 }}
];

links.forEach(n => {
  const li = add('li', ul);
  const a = createLink(n.name, n.text, n.params, li);
});

// listen for location changes
config.ready()
  .then(() => {
    config.subscribe((response) => {
      if (response.status === 301) {
        config.history.replace(response.redirectTo);
      } else if (response.status === 302) {
        config.history.push(response.redirectTo);
      } else if (response.status === 404) {
        mount(div('Uh oh!'), main);
      }
      mount(response.render(response.params), main)

    });    
  });
