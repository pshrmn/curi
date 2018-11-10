import React from "react";
import { ConfirmationFunction } from "@hickory/root";
export interface BlockProps {
    active?: boolean;
    confirm: ConfirmationFunction;
}
export default function Block(props: BlockProps): React.ReactElement<any>;
