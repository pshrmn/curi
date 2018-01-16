import { CuriBase } from "@curi/react";
import { inject, observer } from "mobx-react";

const ReactiveBase = inject(({ curi }) => ({
  router: curi.router,
  response: curi.response,
  action: curi.action
}))(observer(CuriBase));

export default ReactiveBase;
