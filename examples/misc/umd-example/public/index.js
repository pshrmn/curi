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

const routes = [
  {
    name: "Home",
    path: "",
    response() {
      return {
        body: Home
      };
    }
  },
  {
    name: "About",
    path: "about",
    response() {
      return {
        body: About
      };
    }
  }
];

const router = Curi.curi(HickoryHash, routes);
const Router = CuriReactDOM.create_router_component(router);
const root = document.getElementById("root");

function render({ response }) {
  if (!response || response.status === 404) {
    return h("div", null, "The page you were looking for does not exist");
  }
  const Body = response.body ? response.body : null;
  return h("div", null, h(Nav), h(Body));
}

ReactDOM.render(h(Router, { router: router }, render), root);
