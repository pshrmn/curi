import { CuriBase } from "@curi/react";
import { connect } from "react-redux";

export default connect(({ curi }) => ({
  response: curi.response,
  navigation: curi.navigation,
  router: curi.router
}))(CuriBase);
