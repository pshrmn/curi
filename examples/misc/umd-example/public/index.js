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
      h("li", null, h(CuriReact.Link, { name: "Home" }, "Home")),
      h("li", null, h(CuriReact.Link, { name: "About" }, "About"))
    )
  );

const routes = Curi.prepareRoutes([
  {
    name: "Home",
    path: "",
    respond() {
      return {
        body: Home
      };
    }
  },
  {
    name: "About",
    path: "about",
    respond() {
      return {
        body: About
      };
    }
  }
]);

const router = Curi.createRouter(HickoryHash.hash, routes, {
  sideEffects: [
    Curi.announce(({ response }) => {
      return `Navigated to ${response.location.pathname}`;
    })
  ]
});
const Router = CuriReactDOM.createRouterComponent(router);
const root = document.getElementById("root");

function render({ response }) {
  if (!response || response.status === 404) {
    return h("div", null, "The page you were looking for does not exist");
  }
  const Body = response.body ? response.body : null;
  return h("div", null, h(Nav), h(Body));
}

ReactDOM.render(h(Router, { router: router }, render), root);
