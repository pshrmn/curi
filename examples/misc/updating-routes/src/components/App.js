import React from "react";
import { ResponsiveBase } from "@curi/react";

import Nav from "./Nav";
import { baseRoutes, adminRoutes } from "../routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { admin: false };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.props.router.refresh(adminRoutes);
    this.setState({ admin: true });
  }

  logout() {
    const { router } = this.props;
    router.refresh(baseRoutes);
    this.setState({ admin: false });
    const pathname = router.addons.pathname("Home");
    router.history.push(pathname);
  }

  render() {
    return (
      <ResponsiveBase
        {...this.props}
        render={({ response }) => {
          const { body: Body } = response;
          return (
            <div>
              <Nav
                admin={this.state.admin}
                login={this.login}
                logout={this.logout}
              />
              <Body />
            </div>
          );
        }}
      />
    );
  }
}

export default App;
