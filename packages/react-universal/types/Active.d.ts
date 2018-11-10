import { ReactNode } from "react";
import { Response } from "@curi/router";
export interface ActiveProps {
    children(active: boolean, response?: Response): ReactNode;
    name: string;
    params?: object;
    partial?: boolean;
}
export default function (props: ActiveProps): ReactNode;
