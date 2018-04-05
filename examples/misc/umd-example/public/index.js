const h = React.createElement;

const Home = () => h("div", null, "Welcome Home!");
const About = () => h("div", null, "What about it?");
const Nav = () =>
  h(
    "nav",
    null,
    h(
      "ul",
      null,
      h("li", null, h(CuriReact.Link, { to: "Home" }, "Home")),
      h("li", null, h(CuriReact.Link, { to: "About" }, "About"))
    )
  );

const hashHistory = HickoryHash();
const routes = [
  {
    name: "Home",
    path: "",
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: "About",
    path: "about",
    match: {
      response: ({ set }) => {
        set.body(About);
      }
    }
  }
];

const router = Curi(hashHistory, routes);
const root = document.getElementById("root");

function render({ response }) {
  if (!response || response.status === 404) {
    return h("div", null, "The page you were looking for does not exist");
  }
  const Body = response.body ? response.body : null;
  return h("div", null, h(Nav), h(Body));
}

ReactDOM.render(h(CuriReact.CuriProvider, { router: router }, render), root);
