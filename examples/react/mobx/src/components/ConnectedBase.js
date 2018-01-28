import { CuriBase } from "@curi/react";
import { inject, observer } from "mobx-react";

const ConnectedBase = inject(({ curi }) => ({
  router: curi.router,
  response: curi.response,
  navigation: curi.navigation
}))(observer(CuriBase));

export default ConnectedBase;
