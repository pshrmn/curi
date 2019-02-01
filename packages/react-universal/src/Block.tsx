import useBlock from "./hooks/useBlock";

import { ConfirmationFunction } from "@hickory/root";
import { ReactNode } from "react";
import { CuriRouter } from "@curi/router";

export interface BlockProps {
  active?: boolean;
  confirm: ConfirmationFunction;
}

interface BaseBlockProps extends BlockProps {
  router: CuriRouter;
}

export default function Block(props: BlockProps): ReactNode {
  const { active = true, confirm } = props;
  useBlock(active, confirm);
  return null;
}
