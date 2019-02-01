import { ConfirmationFunction } from "@hickory/root";
import { ReactNode } from "react";
export interface BlockProps {
    active?: boolean;
    confirm: ConfirmationFunction;
}
export default function Block(props: BlockProps): ReactNode;
