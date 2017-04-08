const { URIConf, uri, path } = uri_conf;
const { createHashHistory } = History;

// cache the root node
const root = document.getElementById('root');

// setup URIConf variables
const hashHistory = createHashHistory();
const conf = URIConf(hashHistory, [
  uri('Home', path('', { end: true })),
  uri('About', path('about')),
  uri('Users', path('user'), [
    uri('User', path(':id'))
  ])
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
  const pathname = conf.addons.pathname(name, params);
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

// views
const Home = () => div('Welcome home!')
const About = () => div('It\'s about time!');
const Users = () => div('Ewe, sir?!');
const User = (data) => div('Hello, Ms. ' + data.id + '!');

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
conf.subscribe((response) => {
  let ele;
  switch (response.name) {
  case 'User':
    ele = User(response.params);
    break;
  case 'Users':
    ele = Users();
    break;
  case 'About':
    ele = About();
    break;
  case 'Home':
    ele = Home();
    break;
  }
  mount(ele, main);
});
