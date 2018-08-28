import React from "react";
import { ConfirmationFunction } from "@hickory/root";
import { CuriRouter } from "@curi/router";
export interface BlockProps {
    active?: boolean;
    confirm: ConfirmationFunction;
}
export interface BaseBlockProps extends BlockProps {
    router: CuriRouter;
}
declare const Block: (props: BlockProps) => React.ReactElement<any>;
export default Block;
