import { ReactNode } from "react";
import { Response } from "@curi/router";
import { ActiveHookProps } from "./hooks/useActive";
export interface ActiveProps extends ActiveHookProps {
    children(active: boolean, response?: Response): ReactNode;
}
export default function Active(props: ActiveProps): ReactNode;
