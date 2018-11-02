import React from "react";
import { ConfirmationFunction } from "@hickory/root";
export interface BlockProps {
    active?: boolean;
    confirm: ConfirmationFunction;
}
declare const Block: (props: BlockProps) => React.ReactElement<any>;
export default Block;
